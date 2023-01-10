from fastapi import APIRouter, Depends, Response
from queries.accounts import AccountIn, AccountOut, AccountRepository, Error
from typing import Union, List, Optional

router = APIRouter()


#accounts shiz

@router.post("/accounts", response_model=Union[AccountOut, Error])
def create_account(
    account: AccountIn,
    response: Response,
    repo: AccountRepository = Depends(),
):
    # response.status_code = 400
    return repo.create(account)

@router.get("/accounts", response_model= Union[List[AccountOut], Error])
def get_all_accounts(
    repo: AccountRepository = Depends(),
):
    return repo.get_all_accounts()

@router.put("/accounts/{account_id}", response_model=Union[AccountOut, Error])
def update_account(
    account_id: int,
    account: AccountIn,
    repo: AccountRepository = Depends(),
) -> Union[AccountOut, Error]:
    return repo.update_an_account(account_id, account)

@router.delete("/accounts/{account_id}", response_model=bool)
def delete_account(
    account_id: int,
    repo: AccountRepository = Depends(),
) -> bool:
    return repo.delete_account(account_id)


@router.get("/accounts/{account_id}", response_model=Optional[AccountOut])
def get_one_account(
    account_id: int,
    response: Response,
    repo: AccountRepository = Depends(),
) -> AccountOut:
    account = repo.get_one_account(account_id)
    if account is None:
        response.status_code = 404
    return account


#pets shiz

# @router.post#(it's getting late,remember to add your path; response_model=Union[PetOut,Error])
# def create_pet(
#     pet: PetIn,
#     response: Response,
#     repo: PetRepository = Depends(),
# ):
#     response.status_code = 400
#     return repo.create(pet)

# @router.get#(i am too tired to keep trying to be clever about remembering to add a path; response_model=Union[List[PetOut], Error])
# def get_all_pets(
#     repo: PetRepository = Depends(),
# ):
#     return repo.get_all_pets()

# @router.put#(don't forget the path, yo; response_model=Union[PetOut, Error])
# def update_pet(
#     pet_id: int,
#     pet: PetIn,
#     repo: PetRepository = Depends(),
# ) -> Union[PetOut, Error]:
#     return repo.update(pet_id, pet)

# @router.delete #(plz enter your path to this will work; response_model = bool)
# def delete_pet(
#     pet_id: int,
#     repo:PetRepository = Depends(),
# ) -> bool:
#     return repo.delete(pet_id)

# @router.get #(ONE MOAR TIME, path stuff plz; response_model=Optional)
# def get_one_pet(
#     pet_id: int,
#     response: Response,
#     repo: PetRepository = Depends(),
# ) -> PetOut:
#     pet=repo.get_one(pet)
#     if pet is None:
#         response.status_code = 404
#     return pet
