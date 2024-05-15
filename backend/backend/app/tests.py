import base64
import dataclasses as dc
from http import HTTPStatus
import json
import logging
import typing as t

from django import http
from django.contrib.auth.models import User
from django.test import TestCase, Client

from app.src.layers.api.models.logging import Log
from app.src.layers.storage import models as sm


PATH_BASE = '/api/icsr'
USERNAME = 'testuser'
PASSWORD = 'smth1234.'
AUTH = (USERNAME, PASSWORD)


@dc.dataclass(frozen=True)
class RequestData:
    method: t.Callable[..., http.HttpResponse]
    path: str
    auth: tuple[str, str] = AUTH
    id: int = None
    data: dict[str, t.Any] = None
    
    def call(self, *, auth: tuple[str, str] = None, id: int = None, data: dict[str, t.Any] = None) -> http.HttpResponse:
        if auth is None:
            auth = self.auth
        if id is None:
            id = self.id
        if data is None:
            data = self.data

        path = self.path
        if id is not None:
            path += f'/{id}'

        auth_dict = {}
        if auth:
            auth_dict = {
                'HTTP_AUTHORIZATION':
                    'Basic ' + base64.b64encode(f'{auth[0]}:{auth[1]}'.encode()).decode()
            }
        
        if data:
            return self.method(path, data=json.dumps(data), content_type='application/json', **auth_dict)
        else:
            return self.method(path, **auth_dict)


CLIENT = Client()

LIST_RD = RequestData(method=CLIENT.get, path=PATH_BASE)
CREATE_RD = RequestData(method=CLIENT.post, path=PATH_BASE)
READ_RD = RequestData(method=CLIENT.get, path=PATH_BASE, id=0)
UPDATE_RD = RequestData(method=CLIENT.put, path=PATH_BASE, id=0)
DELETE_RD = RequestData(method=CLIENT.delete, path=PATH_BASE, id=0)
VALIDATE_RD = RequestData(method=CLIENT.post, path=PATH_BASE + '/validate')
TO_XML_RD = RequestData(method=CLIENT.post, path=PATH_BASE + '/to-xml')
FROM_XML_RD = RequestData(method=CLIENT.post, path=PATH_BASE + '/from-xml')


class MainTestCase(TestCase):
    def setUp(self):
        logger = logging.getLogger('django.request')
        self.logger = logger
        self.previous_log_level = logger.getEffectiveLevel()
        logger.setLevel(logging.ERROR)

        user = User(username=USERNAME)
        user.set_password(PASSWORD)
        user.save()

    def tearDown(self):
        self.logger.setLevel(self.previous_log_level)

    def test_request_works_only_with_auth(self):
        rds = (
            LIST_RD,
            CREATE_RD,
            READ_RD,
            UPDATE_RD,
            DELETE_RD,
            VALIDATE_RD,
            TO_XML_RD,
            FROM_XML_RD,
        )
        auths_data = (
            ((), False),
            ((USERNAME + '_', PASSWORD), False),
            ((USERNAME, PASSWORD + '_'), False),
            (AUTH, True),
        )
        for rd in rds:
            for auth_data in auths_data:
                auth = auth_data[0]
                is_sucess = auth_data[1]

                response = rd.call(auth=auth)
                if not is_sucess:
                    self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)
                else:
                    self.assertNotEqual(response.status_code, HTTPStatus.UNAUTHORIZED)

    def test_only_requests_for_data_change_are_logged(self):
        rd_log_list = (
            (LIST_RD, False),
            (CREATE_RD, True),
            (READ_RD, False),
            (UPDATE_RD, True),
            (DELETE_RD, True),
            (VALIDATE_RD, False),
            (TO_XML_RD, False),
            (FROM_XML_RD, False),
        )
        count = 0
        for rd_log in rd_log_list:
            rd = rd_log[0]
            is_logged = rd_log[1]
            res = rd.call()
            if is_logged:
                count += 1

        self.assertEqual(Log.objects.count(), count)

    def test_list_cases(self):
        count = 3
        for _ in range(count):
            sm.ICSR.objects.create()

        resp = LIST_RD.call()
        cont = json.loads(resp.content)

        self.assertEqual(resp.status_code, HTTPStatus.OK)
        self.assertEqual(len(cont), count)

    def test_create_case(self):
        ini_data = {
            'c_3_information_sender_case_safety_report': {
                'c_3_2_sender_organisation': {
                    'value': 'abc'
                }
            },
            'c_2_r_primary_source_information': [
                {},
                {}
            ]
        }
        resp = CREATE_RD.call(data=ini_data)
        res_data = json.loads(resp.content)

        self.assertEqual(resp.status_code, HTTPStatus.OK)
        self.assertEqual(sm.ICSR.objects.count(), 1)
        self.assertEqual(sm.C_3_information_sender_case_safety_report.objects.count(), 1)
        self.assertEqual(sm.C_2_r_primary_source_information.objects.count(), 2)
        self.assertEqual(
            sm.ICSR.objects.last().id, 
            res_data['id']
        )
        c_3 = sm.C_3_information_sender_case_safety_report.objects.last()
        self.assertEqual(
            c_3.id, 
            res_data['c_3_information_sender_case_safety_report']['id']
        )
        self.assertEqual(
            c_3.c_3_2_sender_organisation,
            res_data['c_3_information_sender_case_safety_report']['c_3_2_sender_organisation']['value'], 
        )
        self.assertEqual(
            c_3.c_3_2_sender_organisation,
            'abc',
        )
        self.assertEqual(
            sm.C_2_r_primary_source_information.objects.first().id, 
            res_data['c_2_r_primary_source_information'][0]['id']
        )
        self.assertEqual(
            sm.C_2_r_primary_source_information.objects.last().id, 
            res_data['c_2_r_primary_source_information'][1]['id']
        )

    def test_read_case(self):
        icsr = sm.ICSR.objects.create()
        c_3 = sm.C_3_information_sender_case_safety_report.objects.create(icsr=icsr, c_3_2_sender_organisation='abc')
        c_2_1 = sm.C_2_r_primary_source_information.objects.create(icsr=icsr)
        c_2_2 = sm.C_2_r_primary_source_information.objects.create(icsr=icsr)
        
        resp = READ_RD.call(id=icsr.id)
        res_data = json.loads(resp.content)

        self.assertEqual(resp.status_code, HTTPStatus.OK)
        self.assertEqual(
            icsr.id, 
            res_data['id']
        )
        self.assertEqual(
            c_3.id, 
            res_data['c_3_information_sender_case_safety_report']['id']
        )
        self.assertEqual(
            c_3.c_3_2_sender_organisation,
            res_data['c_3_information_sender_case_safety_report']['c_3_2_sender_organisation']['value'], 
        )
        self.assertEqual(
            c_2_1.id,
            res_data['c_2_r_primary_source_information'][0]['id']
        )
        self.assertEqual(
            c_2_2.id,
            res_data['c_2_r_primary_source_information'][1]['id']
        )

    def test_update_case(self):
        icsr = sm.ICSR.objects.create()
        c_3 = sm.C_3_information_sender_case_safety_report.objects.create(icsr=icsr, c_3_2_sender_organisation='abc')
        c_2_1 = sm.C_2_r_primary_source_information.objects.create(icsr=icsr)
        c_2_2 = sm.C_2_r_primary_source_information.objects.create(icsr=icsr)

        ini_data = {
            'c_3_information_sender_case_safety_report': {
                'id': c_3.id,
                'c_3_2_sender_organisation': {
                    'value': 'def'
                }
            },
            'c_2_r_primary_source_information': [
                {}
            ]
        }
        resp = UPDATE_RD.call(id=icsr.id, data=ini_data)
        res_data = json.loads(resp.content)

        icsr.refresh_from_db()
        c_3.refresh_from_db()

        self.assertEqual(resp.status_code, HTTPStatus.OK)
        self.assertEqual(sm.ICSR.objects.count(), 1)
        self.assertEqual(sm.C_3_information_sender_case_safety_report.objects.count(), 1)
        self.assertEqual(sm.C_2_r_primary_source_information.objects.count(), 1)
        self.assertEqual(
            icsr.id, 
            res_data['id']
        )
        self.assertEqual(
            c_3.id, 
            res_data['c_3_information_sender_case_safety_report']['id']
        )
        self.assertEqual(
            c_3.c_3_2_sender_organisation, 
            res_data['c_3_information_sender_case_safety_report']['c_3_2_sender_organisation']['value']
        )
        self.assertEqual(
            c_3.c_3_2_sender_organisation, 
            'def'
        )
        c_2 = sm.C_2_r_primary_source_information.objects.last()
        self.assertEqual(
            c_2.id,
            res_data['c_2_r_primary_source_information'][0]['id']
        )
        self.assertNotEqual(
            c_2.id,
            c_2_1.id
        )
        self.assertNotEqual(
            c_2.id,
            c_2_2.id
        )

    def test_delete_case(self):
        icsrs = [sm.ICSR.objects.create() for _ in range(3)]
        for icsr in icsrs:
            sm.C_3_information_sender_case_safety_report.objects.create(icsr=icsr)
        icsr = icsrs[1]
        sm.C_2_r_primary_source_information.objects.create(icsr=icsr)

        resp = DELETE_RD.call(id=icsr.id)

        self.assertEqual(resp.status_code, HTTPStatus.OK)
        self.assertEqual(sm.ICSR.objects.count(), 2)
        self.assertEqual(sm.C_3_information_sender_case_safety_report.objects.count(), 2)
        self.assertEqual(sm.C_2_r_primary_source_information.objects.count(), 0)
        self.assertEqual(len(sm.ICSR.objects.filter(id=icsr.id)), 0)

    def test_validate_case(self):
        ini_data = {
            'c_3_information_sender_case_safety_report': {
                'c_3_2_sender_organisation': {
                    'value': '№'
                }
            },
        }

        resp = VALIDATE_RD.call(data=ini_data)
        res_data = json.loads(resp.content)

        self.assertEqual(resp.status_code, HTTPStatus.BAD_REQUEST)
        self.assertEqual(
            len(res_data['_errors']['c_3_information_sender_case_safety_report']['c_3_2_sender_organisation']['_self']['parsing']),
            1
        )

    def test_to_xml_and_from_xml(self):
        ini_data = {
            'c_3_information_sender_case_safety_report': {
                'c_3_2_sender_organisation': {
                    'value': 'abc'
                }
            },
            'c_2_r_primary_source_information': [
                {},
                {
                    'c_2_r_1_1_reporter_title': {
                        'value': 'def'
                    }
                }
            ],
            'c_4_r_literature_reference': [
                {}
            ]
        }

        resp_to = TO_XML_RD.call(data=ini_data)
        xml = resp_to.content.decode()

        self.assertEqual(resp_to.status_code, HTTPStatus.OK)

        resp_from = FROM_XML_RD.call(data={'value': xml})
        res_data = json.loads(resp_from.content)

        self.assertEqual(resp_from.status_code, HTTPStatus.OK)
        self.assertEqual(
            res_data['c_3_information_sender_case_safety_report']['c_3_2_sender_organisation']['value'],
            'abc'
        )
        self.assertEqual(
            res_data['c_2_r_primary_source_information'][1]['c_2_r_1_1_reporter_title']['value'],
            'def'
        )
        self.assertEqual(len(res_data['c_2_r_primary_source_information']), 2)
        self.assertEqual(len(res_data['c_4_r_literature_reference']), 1)
        self.assertEqual(len(res_data['f_r_results_tests_procedures_investigation_patient']), 0)
