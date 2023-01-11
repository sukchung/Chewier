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
