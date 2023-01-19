from fastapi import APIRouter, Depends, Response
from queries.pets import PetIn, PetOut, PetRepository, Error
from typing import Union, List

router = APIRouter()


@router.post("/pets", response_model=Union[PetOut, Error])
def create_pet(
    pet: PetIn,
    response: Response,
    repo: PetRepository = Depends(),
):
    # response.status_code = 400
    return repo.create(pet)


@router.get("/pets", response_model=Union[List[PetOut], Error])
def get_all_pets(
    repo: PetRepository = Depends(),
):
    return repo.get_all_pets()


@router.put("/pets/{pet_id}", response_model=Union[PetOut, Error])
def update_pet(
    pet_id: int,
    pet: PetIn,
    repo: PetRepository = Depends(),
) -> Union[PetOut, Error]:
    return repo.update_pet(pet_id, pet)


@router.delete("/pets/{pet_id}", response_model=bool)
def delete_pet(
    pet_id: int,
    repo: PetRepository = Depends(),
) -> bool:
    return repo.delete_pet(pet_id)
