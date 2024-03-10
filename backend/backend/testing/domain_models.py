from pydantic import BaseModel


class NullFlavor(BaseModel):
    null_flavor: str


class BaseDomainModel(BaseModel):
    id: int | None = None


class ContainerDomainModel(BaseDomainModel):
    elements: list['ElementDomainModel'] = []


class ElementDomainModel(BaseDomainModel):
    text: str | NullFlavor | None = None
    num: int | None = None
