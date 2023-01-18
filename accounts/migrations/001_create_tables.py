steps = [
    [
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(1000) NOT NULL,
            last_name VARCHAR(1000) NOT NULL,
            email VARCHAR(1000) UNIQUE NOT NULL,
            address VARCHAR(1000) NOT NULL,
            hashed_password VARCHAR(1000)
        );
        """,
        """
        DROP TABLE accounts
        """
    ],
    [
        """
        CREATE TABLE pets(
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(1000) NOT NULL,
        breed VARCHAR(1000) NOT NULL,
        size VARCHAR(1000) NOT NULL,
        age VARCHAR(1000) NOT NULL,
        account_id INT NOT NULL REFERENCES accounts(id)
        );
        """,
        """
        DROP TABLE pets
        """
    ]
]
