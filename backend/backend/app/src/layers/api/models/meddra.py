from pydantic import BaseModel, RootModel

from app.src.enums import MedDRALevelEnum


class Release(BaseModel):
    id: int
    version: str
    language: str


class ReleaseResponse(RootModel):
    root: list[Release]


class State(BaseModel):
    SOC: int | None = None
    HLGT: int | None = None
    HLT: int | None = None
    PT: int | None = None
    LLT: int | None = None


class Search(BaseModel):
    level: MedDRALevelEnum
    input: str


class SearchRequest(BaseModel):
    state: State
    search: Search


class Term(BaseModel):
    code: int
    name: str


class SearchResponse(BaseModel):
    level: MedDRALevelEnum
    terms: list[Term]
