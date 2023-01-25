steps = [
    [
        # ADDED UNIQUE CONSTRAINT ON EMAIL
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(1000) NOT NULL,
            last_name VARCHAR(1000) NOT NULL,
            email VARCHAR(1000) NOT NULL UNIQUE,
            address VARCHAR(1000) NOT NULL,
            hashed_password VARCHAR(1000)
        );
        """,
        """
        DROP TABLE accounts
        """,
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
        """,
    ],
    [
        """
        CREATE TABLE customs(
            id SERIAL PRIMARY KEY NOT NULL,
            goal VARCHAR(1000) NOT NULL,
            breed VARCHAR(1000) NOT NULL,
            age VARCHAR(1000) NOT NULL,
            allergies VARCHAR(1000) NOT NULL,
            activity VARCHAR(1000) NOT NULL,
            protein VARCHAR(1000) NOT NULL,
            state VARCHAR(1000) NOT NULL,
            account_id INT NOT NULL REFERENCES accounts(id),
            price NUMERIC DEFAULT 70.99,
            name VARCHAR(1000) DEFAULT 'Custom Food' NOT NULL
        );
        """,
        """
        DROP TABLE customs
        """,
    ],
]
