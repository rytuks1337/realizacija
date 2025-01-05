-- Define ENUM type
CREATE TYPE vartotojo_tipas AS ENUM ('Judge', 'Participant', 'Organizer', 'Owner');
CREATE TYPE prazangos_tipas AS ENUM ('Elbow', 'Hand', 'FStart');
CREATE TYPE ranka_tipas AS ENUM ('K', 'D');
CREATE TYPE lytis_tipas AS ENUM ('V', 'M');
CREATE TYPE status_tipasA AS ENUM ('INIT', 'SETUP', 'REGISTER', 'IN_PROCCESS', 'FINISHED');
CREATE TYPE status_tipasB AS ENUM ('CREATED', 'IN_PROCCESS', 'FINISHED');


-- Create table: "Vartotojas"
CREATE TABLE "Vartotojas" (
    ID SERIAL PRIMARY KEY,
    vardas VARCHAR(50),
    pavarde VARCHAR(50),
    amzius DATE,
    el_pastas VARCHAR(50) UNIQUE,
    slaptazodis VARCHAR(70),
    lytis lytis_tipas,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);


-- Create table: "VartotojoUUID"
CREATE TABLE "VartotojoUUID" (
    ID SERIAL PRIMARY KEY,
    "vartotojo_ID" INT REFERENCES "Vartotojas"(ID),
    "UUID" VARCHAR(36),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- Create table: "Turnyras"
CREATE TABLE "Turnyras" (
    ID SERIAL PRIMARY KEY,
    pavadinimas VARCHAR(100),
    status status_tipasA,
    data TIMESTAMP,
    lokacija VARCHAR(50),
    stalu_sk INT,
    tvarka VARCHAR(50)[][] NULL,
    pabaiga VARCHAR(5),
    aprasas VARCHAR(4096),
    filepath VARCHAR(50),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- Create table: "Pogrupis"
CREATE TABLE "Pogrupis" (
    ID SERIAL PRIMARY KEY,
    "turnyro_ID" INT REFERENCES "Turnyras"(ID),
    pavadinimas VARCHAR(50),
    svoris VARCHAR(4),
    amzius VARCHAR(4) NULL,
    lytis lytis_tipas,
    ranka ranka_tipas,
    lenkimo_tvarka INT[],
    bracket JSONB NULL,
    raundas INT DEFAULT 0,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- Create table: "Turnyro_Role"
CREATE TABLE "Turnyro_Role" (
    ID SERIAL PRIMARY KEY,
    "vartotojo_ID" INT NULL REFERENCES "Vartotojas"(ID),
    "turnyro_ID" INT REFERENCES "Turnyras"(ID),
    vardas VARCHAR(50) NULL,
    pavarde VARCHAR(50) NULL,
    amzius DATE NULL,
    svoris FLOAT NULL,
    grupiu_id INT[] NULL,
    lytis lytis_tipas,
    vartotojo_tipas vartotojo_tipas,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);
-- Create table: "Dalyviai"
CREATE TABLE "DalyvisTurnyrineLentele" (
    ID SERIAL PRIMARY KEY,
    "roles_ID" INT REFERENCES "Turnyro_Role"(ID),
    grupes_id INT REFERENCES "Pogrupis"(ID),
    laimejimai INT DEFAULT 0,
    pralaimejimai INT DEFAULT 0,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- Create table: "Stalai"
CREATE TABLE "Stalai" (
    ID SERIAL PRIMARY KEY,
    nr INT,
    "dabartinisLenkimoGrupesID" INT NULL,
    lenkimo_id INT[],
    turnyro_id INT,
    teiseju_id INT[] DEFAULT ARRAY[]::INT[],
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- Create table: "Lenkimo_sesija"
CREATE TABLE "Lenkimo_sesija" (
    ID SERIAL PRIMARY KEY,
    "dalyvio_ID" INT REFERENCES "DalyvisTurnyrineLentele"(ID),
    "dalyvio2_ID" INT REFERENCES "DalyvisTurnyrineLentele"(ID),
    "laimetojoDalyvio_ID" INT NULL REFERENCES "DalyvisTurnyrineLentele"(ID),
    "pralaimetoDalyvio_ID" INT NULL REFERENCES "DalyvisTurnyrineLentele"(ID),
    "teisejai_ID" INT[],
    "grupes_ID" INT REFERENCES "Pogrupis"(ID),
    round INT,
    status status_tipasB DEFAULT 'CREATED',
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- Create table: "Prazangos"
CREATE TABLE "Prazangos" (
    ID SERIAL PRIMARY KEY,
    "dalyvio_ID" INT REFERENCES "DalyvisTurnyrineLentele"(ID),
    "lenkimo_ID" INT REFERENCES "Lenkimo_sesija"(ID),
    prazangos_tipas prazangos_tipas,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);
