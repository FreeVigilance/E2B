import typing as t

import pydantic as pd


class BusinessValidationUtils:
    _FLAG_KEY = '_is_business_validation'

    @classmethod
    def is_business_validation(cls, info: pd.ValidationInfo) -> bool:
        return bool(info.context.get(cls._FLAG_KEY))
    
    @classmethod
    def create_context(cls, existing_context: dict[str, t.Any] | None = None) -> dict[str, t.Any]:
        context = {cls._FLAG_KEY: True}
        if existing_context:
            context.update(existing_context)
        return context