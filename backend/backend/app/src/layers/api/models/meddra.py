from pydantic import BaseModel, RootModel
from enum import StrEnum


class LevelEnum(StrEnum):
    SOC = "SOC"
    HLGT = "HLGT"
    HLT = "HLT"
    PT = "PT"
    LLT = "LLT"


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
    level: LevelEnum
    input: str


class SearchRequest(BaseModel):
    state: State
    search: Search


class Term(BaseModel):
    code: int
    name: str


class SearchResponse(BaseModel):
    level: LevelEnum
    terms: list[Term]
