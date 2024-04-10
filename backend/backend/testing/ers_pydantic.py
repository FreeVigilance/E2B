import typing as t

def test():
    import json

    from extensions.pydantic.models import ExtendedBaseModel
    from app.src.layers.api.models import ApiModel, Value, NullableValue
    from app.src.shared.enums import NullFlavor 
    from extensions import utils
        
    class Element(ExtendedBaseModel):
        el_nv: NullableValue[int, t.Literal[NullFlavor.ASKU]]

    class Container(ExtendedBaseModel):
        els: list[Element] = []
        cn_v: Value[int]
        # = Value[int]()

    data = {
        'cn_v': {
            'value': 'a'
        },
        'els': [
            {

            },
            {
                'el_nv': {
                    'value': 1,
                    'null_flavor': 'ASKU'
                }
            },
            {
                'el_nv': {
                    'value': None,
                    'null_flavor': 'MSK'
                }
            },
            {
                'el_nv': {
                    'value': 2
                }
            },
        ]
    }
    
    model = Container.build(data)
    print(json.dumps(model.model_dump(by_alias=True), indent=4))
    print()
    print(model.is_valid)
    print()
    print(model.exception)