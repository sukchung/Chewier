### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * email: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        "email": string,
        "password": string,
      },
      "token": string
    }
    ```

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```


### Sign Up

* Endpoint path: /signup
* Endpoint method: POST

* Request shape (form):
  * first_name: string
  * last_name: string
  * email: string
  * password: string
  * address: string
  * phone_number: integer

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        "first_name": string,
        "last_name": string,
        "email": string,
        "password": string,
        "address": string,
        "phone_number": integer,
      },
      "token": string
    }
    ```

### Create a pet (CHECK JSON IF ACCOUNT_ID IS NEEDED SINCE WE HAVE AUTHORIZATION)
* Endpoint path: /pets
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "name": string,
        "breed": string,
        "size": string,
        "age": integer,
        "account_id": integer,
    }
    ```

* Response: New pet created
* Response shape (JSON):
    ```json
    {
        "id": integer,
        "name": string,
        "breed": string,
        "size": string,
        "age": integer,
        "account_id": integer,
    }
    ```

### List all Account's Pets

* Endpoint path: /accounts/id/pets
* Endpoint method: GET

* Response: List of all specific account's pets
* Response shape (JSON):
    ```json
    {
        "id": integer,
        "name": string,
        "breed": string,
        "size": string,
        "age": integer,
        "account_id": integer,
    }
    ```



### Delete a pet
* Endpoint path: /pets/id
* Endpoint method: DELETE


* Response: Product deleted
* Response shape (JSON):
    ```json
    {
        "deleted": boolean,
    }
    ```

### Update a pet
* Endpoint path: /pets/id
* Endpoint method: PUT

* Request shape (JSON):
    ```json
    {
        "id": integer,
        "name": string,
        "breed": string,
        "size": string,
        "age": integer,
        "account_id": integer,
    }
    ```

* Response: Existing pet updated
* Response shape (JSON):
    ```json
    {
        "id": integer,
        "name": string,
        "breed": string,
        "size": string,
        "age": integer,
        "account_id": integer,
    }
    ```

### Account detail

* Endpoint path: /accounts/id
* Endpoint method: GET

* Response: Account detail
* Response shape (JSON):
    ```json
    {
        "account": {
            "first_name": string,
            "last_name": string,
            "email": string,
            "address": string,
            "phone_number": integer,
      },
        "pets": {
            "pet_id": integer,
            "name": string
        }
    }
    ```

### List all Accounts

* Endpoint path: /accounts
* Endpoint method: GET

* Response: List of all accounts
* Response shape (JSON):
    ```json
    {
        "account": {
            "first_name": string,
            "last_name": string,
            "email": string,
            "address": string,
            "phone_number": integer,
      },
        "pets": {
            "pet_id": integer,
            "name": string
        }
    }
    ```

### Delete Account

* Endpoint path: /accounts/id
* Endpoint method: DELETE


* Response: Account deleted
* Response shape (JSON):
    ```json
    {
        "deleted": boolean,
    }
    ```


### Update Account

* Endpoint path: /accounts/id
* Endpoint method: PUT

* Request shape (JSON):
    ```json
    {
        "account": {
            "first_name": string,
            "last_name": string,
            "email": string,
            "password": string,
            "address": string,
            "phone_number": integer,
      },
    }
    ```

* Response: Existing Account updated
* Response shape (JSON):
    ```json
    {
        "account": {
            "first_name": string,
            "last_name": string,
            "email": string,
            "password": string,
            "address": string,
            "phone_number": integer,
      },
    }
    ```


<!-- ### List Items

* Endpoint path: /products
* Endpoint method: GET

* Response: list of products
* Response shape (JSON):
    ```json
    {
        "products": [
            {
                "name": string,
                "picture_url": string,
                "price": decimal,
            }
        ]
    }
    ``` -->


### Filter a list of items

* Endpoint path: /products
* Endpoint method: GET
* Query parameters:
  * q: the filters checked

* Response: a list of filtered products
* Response shape (JSON):
    ```json
    {
        "products": [
            {
                "name": string,
                "picture_url": string,
                "price": decimal,
            }
        ]
    }
    ```


### Search Bar

* Endpoint path: /products
* Endpoint method: GET
* Query parameters:
  * q: the word(s) to search for

* Response: a list of products with keywords
* Response shape (JSON):
    ```json
    {
        "products": [
            {
                "name": string,
                "picture_url": string,
                "price": decimal,
            }
        ]
    }
    ```


### Create a brand

* Endpoint path: /brands
* Endpoint method: POST

* Request shape (JSON):
    ```json
    {
        "name": string,
        "animal_type": string,
    }
    ```

* Response: New brand created
* Response shape (JSON):
    ```json
    {
        "id": integer,
        "name": string,
        "animal_type": string,
    }
    ```

### Brand detail

* Endpoint path: /brands/id
* Endpoint method: GET

* Response: Brand detail
* Response shape (JSON):
    ```json
    {
        "id": integer,
        "name": string,
        "animal_type": string,
    }
    ```

### List all brands

* Endpoint path: /brands
* Endpoint method: GET

* Response: List of all brands
* Response shape (JSON):
    ```json
    {
        "id": integer,
        "name": string,
        "animal_type": string,
    }
    ```

### Delete a brand

* Endpoint path: /brands/id
* Endpoint method: DELETE


* Response: Brand deleted
* Response shape (JSON):
    ```json
    {
        "deleted": boolean,
    }
    ```


### Update a brand

* Endpoint path: /brands/id
* Endpoint method: PUT

* Request shape (JSON):
    ```json
    {
        "name": string,
        "animal_type": string,
    }
    ```

* Response: Existing brand updated
* Response shape (JSON):
    ```json
    {
        "id": integer,
        "name": string,
        "animal_type": string,
    }
    ```

### Create a Food Type

* Endpoint path: /foodtypes
* Endpoint method: POST

* Request shape (JSON):
    ```json
    {
        "brand_id": integer,
        "state": string,
    }
    ```

* Response: New food type created
* Response shape (JSON):
    ```json
    {
        "id": integer,
        "brand_id": integer,
        "state": string,
    }
    ```

### Food type detail

* Endpoint path: /foodtypes/id
* Endpoint method: GET

* Response: Food type detail
* Response shape (JSON):
    ```json
    {
        "id": integer,
        "brand_id": integer,
        "state": string,
    }
    ```

### List all Food Type

* Endpoint path: /foodtypes
* Endpoint method: GET

* Response: List of all food types
* Response shape (JSON):
    ```json
    {
        "id": integer,
        "brand_id": integer,
        "state": string,
    }
    ```

### Delete a Food type

* Endpoint path: /foodtypes/id
* Endpoint method: DELETE


* Response: Food type deleted
* Response shape (JSON):
    ```json
    {
        "deleted": boolean
    }
    ```


### Update a Food Type

* Endpoint path: /foodtypes/id
* Endpoint method: PUT

* Request shape (JSON):
    ```json
    {
        "id": integer,
        "brand_id": integer,
        "state": string,
    }
    ```

* Response: Existing food type updated
* Response shape (JSON):
    ```json
    {
        "id": integer,
        "brand_id": integer,
        "state": string,
    }
    ```

### Create a Food Product

* Endpoint path: /products
* Endpoint method: POST

* Request shape (JSON):
    ```json
    {
        "name": string,
        "price": decimal,
        "foodtype_id": integer,
        "picture_url": string,
    }
    ```

* Response: New product created
* Response shape (JSON):
    ```json
    {
        "id": integer,
        "name": string,
        "price": decimal,
        "foodtype_id": integer,
        "picture_url": string,
    }
    ```

### Food Product detail

* Endpoint path: /products/id
* Endpoint method: GET

* Response: Product detail
* Response shape (JSON):
    ```json
    {
        "id": integer,
        "name": string,
        "price": decimal,
        "foodtype_id": integer,
        "picture_url": string,
    }
    ```

### List all Food Product

* Endpoint path: /products
* Endpoint method: GET

* Response: List of all products
* Response shape (JSON):
    ```json
    {
        "id": integer,
        "name": string,
        "price": decimal,
        "foodtype_id": integer,
        "picture_url": string,
    }
    ```

### Delete a Food Product

* Endpoint path: /products/id
* Endpoint method: DELETE


* Response: Product deleted
* Response shape (JSON):
    ```json
    {
        "deleted": boolean,
    }
    ```


### Update a Food Product

* Endpoint path: /products/id
* Endpoint method: PUT

* Request shape (JSON):
    ```json
    {
        "id": integer,
        "name": string,
        "price": decimal,
        "foodtype_id": integer,
        "picture_url": string,
    }
    ```

* Response: Existing product updated
* Response shape (JSON):
    ```json
    {
        "id": integer,
        "name": string,
        "price": decimal,
        "foodtype_id": integer,
        "picture_url": string,
    }
    ```
