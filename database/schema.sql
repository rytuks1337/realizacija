-- Define ENUM type
CREATE TYPE vartotojo_tipas AS ENUM ('Judge', 'Participant', 'Organizer');
CREATE TYPE prazangos_tipas AS ENUM ('Elbow', 'Hand', 'FStart', 'ISlip');
CREATE TYPE ranka_tipas AS ENUM ('K', 'D');
CREATE TYPE lytis_tipas AS ENUM ('V', 'M');


-- Create table: "Vartotojas"
CREATE TABLE "Vartotojas" (
    ID SERIAL PRIMARY KEY,
    vardas VARCHAR(50),
    pavarde VARCHAR(50),
    amzius INT,
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
    pavadinimas VARCHAR(50),
    svoris INT,
    amzius_k INT,
    lytis lytis_tipas,
    ranka ranka_tipas,
    "turnyro_ID" INT,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- Create table: "Turnyras"
CREATE TABLE "Turnyras" (
    ID SERIAL PRIMARY KEY,
    pavadinimas VARCHAR(100),
    data DATE,
    lokacija VARCHAR(50),
    stalu_sk INT,
    pradzia TIME,
    pabaiga TIME,
    aprasas VARCHAR(4096),
    "organizatoriusVartotojo_ID" INT,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- Create table: "Turnyro_Role"
CREATE TABLE "Turnyro_Role" (
    ID SERIAL PRIMARY KEY,
    "vartotojo_ID" INT,
    vartotojo_tipas vartotojo_tipas,
    "turnyro_ID" INT,
    FOREIGN KEY ("vartotojo_ID") REFERENCES "Vartotojas"(ID),
    FOREIGN KEY ("turnyro_ID") REFERENCES "Turnyras"(ID),
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);

-- Create table: "Lenkimo_sesija"
CREATE TABLE "Lenkimo_sesija" (
    ID SERIAL PRIMARY KEY,
    "dalyvio_ID" INT,
    "dalyvio2_ID" INT,
    "laimetojoDalyvio_ID" INT,
    "teisejas_ID" INT,
    "teisejas2_ID" INT,
    "varzybu_ID" INT,
    "pogrupis_ID" INT,
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

-- Add foreign keys to "Turnyras" table
ALTER TABLE "Turnyras"
    ADD CONSTRAINT fk_turnyro_organizatorius
    FOREIGN KEY ("organizatoriusVartotojo_ID")
    REFERENCES "Vartotojas"(ID);

-- Add foreign keys to TurnyroRole table
ALTER TABLE "Turnyro_Role"
    ADD CONSTRAINT fk_turnyro_role_vartotojas
    FOREIGN KEY ("vartotojo_ID")
    REFERENCES "Vartotojas"(ID);

ALTER TABLE "Turnyro_Role"
    ADD CONSTRAINT fk_turnyro_role_turnyro
    FOREIGN KEY ("turnyro_ID")
    REFERENCES "Turnyras"(ID);

-- Add foreign keys to "Lenkimo_sesija" table
ALTER TABLE "Lenkimo_sesija"
    ADD CONSTRAINT fk_lenkimo_sesija_dalyvio1
    FOREIGN KEY ("dalyvio_ID")
    REFERENCES "Turnyro_Role"(ID);

ALTER TABLE "Lenkimo_sesija"
    ADD CONSTRAINT fk_lenkimo_sesija_dalyvio2
    FOREIGN KEY ("dalyvio2_ID")
    REFERENCES "Turnyro_Role"(ID);

ALTER TABLE "Lenkimo_sesija"
    ADD CONSTRAINT fk_lenkimo_sesija_laimetojas
    FOREIGN KEY ("laimetojoDalyvio_ID")
    REFERENCES "Turnyro_Role"(ID);

ALTER TABLE "Lenkimo_sesija"
    ADD CONSTRAINT fk_lenkimo_sesija_teisejas1
    FOREIGN KEY ("teisejas_ID")
    REFERENCES "Turnyro_Role"(ID);

ALTER TABLE "Lenkimo_sesija"
    ADD CONSTRAINT fk_lenkimo_sesija_teisejas2
    FOREIGN KEY ("teisejas2_ID")
    REFERENCES "Turnyro_Role"(ID);

ALTER TABLE "Lenkimo_sesija"
    ADD CONSTRAINT fk_lenkimo_sesija_turnyro
    FOREIGN KEY ("varzybu_ID")
    REFERENCES "Turnyras"(ID);

-- Add foreign keys to "Prazangos" table
ALTER TABLE "Prazangos"
    ADD CONSTRAINT fk_prazangos_turnyrorole
    FOREIGN KEY ("dalyvio_ID")
    REFERENCES "Turnyro_Role"(ID);

ALTER TABLE "Prazangos"
    ADD CONSTRAINT fk_prazangos_lenkimo_sesija
    FOREIGN KEY ("lenkimo_ID")
    REFERENCES "Lenkimo_sesija"(ID);
