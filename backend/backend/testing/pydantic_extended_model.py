import pydantic as pd

from extensions import pydantic as pde


class Elem(pde.SafeValidatableModel):
    num: int

    @classmethod
    def _post_validate(cls, processor: pde.PostValidationProcessor):
        processor.try_validate(
            ('num',),
            'len <= 2',
            lambda num:
                len(str(num)) > 2
        )
        processor.try_validate(
            ('num',),
            'len <= 3',
            lambda num:
                len(str(num)) > 3,
            is_abort_next=True,
        )
        processor.try_validate(
            ('num',),
            'len <= 4',
            lambda num:
                len(str(num)) > 4
        )


class Cont(pde.SafeValidatableModel):
    num1: int
    num2: int
    elems: list[Elem] = []

    @classmethod
    def _post_validate(cls, processor: pde.PostValidationProcessor):
        processor.try_validate(
            ('num1', 'num2'),
            'num1 != num2',
            lambda num1, num2:
                num1 == num2
        )


def test():
    from testing import pydantic_extended_model as pde
    data = dict(num1=1, num2=1, elems=[dict(num='1')])
    try:
        model = pde.Cont.model_parse(data)
        model.model_safe_validate(data, context={'temp': 1})
        if model.exception:
            raise model.exception
    except pd.ValidationError as exc:
        print()
        print(exc)
        # print()
        # for e in exc.errors():
        #     print(e)