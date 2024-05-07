import datetime as dt
import enum
import re
import typing as t

from hl7apy import utils


class DatePrecision(enum.IntEnum):
    YEAR = enum.auto()
    MONTH = enum.auto()
    DAY = enum.auto()
    HOUR = enum.auto()
    MINUTE = enum.auto()
    SECOND = enum.auto()
    MILLISECOND = enum.auto()

    __MAP = {
        '%Y': YEAR,
        '%Y%m': MONTH,
        '%Y%m%d': DAY,
        '%Y%m%d%H': HOUR,
        '%Y%m%d%H%M': MINUTE,
        '%Y%m%d%H%M%S': SECOND,
        '%Y%m%d%H%M%S.%f': MILLISECOND,
    }

    @classmethod
    def from_format(cls, format: str) -> t.Self:
        return cls.__MAP[format]
    

class HL7DateUtils:
    @classmethod
    def parse_and_get_precision(cls, value: str) -> DatePrecision:
        return DatePrecision.from_format(cls.parse(value)[1])

    @staticmethod
    def parse(value: str) -> tuple[dt.datetime, str, str, int]:
        try:
            return utils.get_datetime_info(value)
        
        # The first error will be rethrown if new occur
        except ValueError as exc: 
            new_value = value

            # Support for 24 hours format
            if re.match(r'\d{8}24', value):
                try:
                    date = utils.get_date_info(value[0: 8])[0]
                except ValueError:
                    raise exc
                date += dt.timedelta(days=1)
                new_value = date.strftime('%Y%m%d') + '00' + value[10:]

            # Support for timezone without minutes format
            if re.fullmatch(r'.*[+|-]\d{2}', new_value):
                new_value += '00'

            # Extra support conditions were not met
            if new_value == value:
                raise exc
            
            try:
                return utils.get_datetime_info(new_value)
            except ValueError:
                raise exc