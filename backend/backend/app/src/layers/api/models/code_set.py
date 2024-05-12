from pydantic import BaseModel, RootModel


class Term(BaseModel):
    code: str
    name: str


class SearchResponse(RootModel):
    root: list[Term]
