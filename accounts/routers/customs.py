from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.customs import Error, CustomIn, CustomOut, CustomRepository

router = APIRouter()


@router.post("/customs", response_model=Union[CustomOut, Error])
def create_custom(
    custom: CustomIn, response: Response, repo: CustomRepository = Depends()
):
    return repo.create(custom)


@router.get("/customs/{custom_id}", response_model=Optional[CustomOut])
def get_one_custom(
    custom_id: int, response: Response, repo: CustomRepository = Depends()
) -> CustomOut:
    custom = repo.get_one(custom_id)
    if custom is None:
        response.status_code = 404
    return custom


@router.get("/customs", response_model=Union[List[CustomOut], Error])
def get_all(repo: CustomRepository = Depends()):
    return repo.get_all()
