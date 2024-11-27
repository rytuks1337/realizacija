-- Define ENUM type
CREATE TYPE vartotojo_tipas AS ENUM ('Judge', 'Participant', 'Organizer', 'Owner');
CREATE TYPE prazangos_tipas AS ENUM ('Elbow', 'Hand', 'FStart', 'ISlip');
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
    svoris FLOAT NULL,
    el_pastas VARCHAR(50) UNIQUE,
    slaptazodis VARCHAR(70),
    lytis lytis_tipas,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);


-- Create table: "VartotojoUUID"
CREATE TABLE "VartotojoUUID" (
    ID SERIAL PRIMARY KEY,
    "vartotojo_ID" INT,
    "UUID" VARCHAR(36),
    FOREIGN KEY ("vartotojo_ID") REFERENCES "Vartotojas"(ID),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- Create table: "Pogrupis"
CREATE TABLE "Pogrupis" (
    ID SERIAL PRIMARY KEY,
    "turnyro_ID" INT,

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

-- Create table: "Turnyras"
CREATE TABLE "Turnyras" (
    ID SERIAL PRIMARY KEY,
    pavadinimas VARCHAR(100),
    status status_tipasA,
    data TIMESTAMP,
    lokacija VARCHAR(50),
    stalu_sk INT,
    tvarka VARCHAR(50)[][] NULL,
    pabaiga INT,
    aprasas VARCHAR(4096),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);
-- Create table: "Turnyro_Role"
CREATE TABLE "Turnyro_Role" (
    ID SERIAL PRIMARY KEY,
    "vartotojo_ID" INT NULL,
    "turnyro_ID" INT,
    vardas VARCHAR(50) NULL,
    pavarde VARCHAR(50) NULL,
    amzius DATE NULL,
    svoris FLOAT NULL,
    grupiu_id INT[] NULL,
    lytis lytis_tipas,
    vartotojo_tipas vartotojo_tipas,
    FOREIGN KEY ("vartotojo_ID") REFERENCES "Vartotojas"(ID),
    FOREIGN KEY ("turnyro_ID") REFERENCES "Turnyras"(ID),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);
-- Create table: "Dalyviai"
CREATE TABLE "DalyvisTurnyrineLentle" (
    ID SERIAL PRIMARY KEY,
    "roles_ID" INT,
    grupes_id INT,
    laimejimai INT DEFAULT 0,
    pralaimejimai INT DEFAULT 0,
    FOREIGN KEY ("roles_ID") REFERENCES "Turnyro_Role"(ID),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- Create table: "Stalai"
CREATE TABLE "Stalai" (
    ID SERIAL PRIMARY KEY,
    nr INT,
    "dabartinisLenkimoID" INT NULL,
    lenkimo_id INT[],
    turnyro_id INT,
    teiseju_id INT[] DEFAULT ARRAY[]::INT[],
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- Create table: "Lenkimo_sesija"
CREATE TABLE "Lenkimo_sesija" (
    ID SERIAL PRIMARY KEY,
    "dalyvio_ID" INT,
    "dalyvio2_ID" INT,
    "laimetojoDalyvio_ID" INT NULL,
    "pralaimetoDalyvio_ID" INT NULL,
    "teisejai_ID" INT[],
    "grupes_ID" INT,
    FOREIGN KEY ("dalyvio_ID") REFERENCES "DalyvisTurnyrineLentle"(ID),
    FOREIGN KEY ("dalyvio2_ID") REFERENCES "DalyvisTurnyrineLentle"(ID),
    FOREIGN KEY ("laimetojoDalyvio_ID") REFERENCES "DalyvisTurnyrineLentle"(ID),
    FOREIGN KEY ("pralaimetoDalyvio_ID") REFERENCES "DalyvisTurnyrineLentle"(ID),
    FOREIGN KEY ("grupes_ID") REFERENCES "Pogrupis"(ID),
    status status_tipasB DEFAULT 'CREATED',
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- Create table: "Prazangos"
CREATE TABLE "Prazangos" (
    ID SERIAL PRIMARY KEY,
    "dalyvio_ID" INT,
    "lenkimo_ID" INT,
    prazangos_tipas prazangos_tipas,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- Create table: Irasa_prisijungimai
CREATE TABLE "Irasas_prisijungimai" (
    ID SERIAL PRIMARY KEY,
    cre_data TIMESTAMP,
    duomenys VARCHAR(4096),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- Create table: Irasa_turnyro
CREATE TABLE "Irasas_turnyro" (
    ID SERIAL PRIMARY KEY,
    cre_data TIMESTAMP,
    duomenys VARCHAR(4096),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);


-- Add foreign keys to TurnyroRole table
ALTER TABLE "Turnyro_Role"
    ADD CONSTRAINT fk_turnyro_role_vartotojas
    FOREIGN KEY ("vartotojo_ID")
    REFERENCES "Vartotojas"(ID);

ALTER TABLE "Turnyro_Role"
    ADD CONSTRAINT fk_turnyro_role_turnyro
    FOREIGN KEY ("turnyro_ID")
    REFERENCES "Turnyras"(ID);

ALTER TABLE "Prazangos"
    ADD CONSTRAINT fk_prazangos_lenkimo_sesija
    FOREIGN KEY ("lenkimo_ID")
    REFERENCES "Lenkimo_sesija"(ID);
