-- SEQUENCE: public.tb_user_user_id_seq

-- DROP SEQUENCE IF EXISTS public.tb_user_user_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.tb_user_user_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.tb_user_user_id_seq
    OWNER TO fcxlabsdbdev;


-- Table: public.tb_user

-- DROP TABLE IF EXISTS public.tb_user;

CREATE TABLE IF NOT EXISTS public.tb_user
(
    user_id integer NOT NULL DEFAULT nextval('tb_user_user_id_seq'::regclass),
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    phone character varying(13) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    cpf character varying(11) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    mother_name character varying(255) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    status integer NOT NULL DEFAULT 1,
    updated_at timestamp without time zone,
    created_at timestamp without time zone,
    birtday timestamp without time zone,
    CONSTRAINT tb_user_pkey PRIMARY KEY (user_id),
    CONSTRAINT tb_user_username_key UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tb_user
    OWNER to fcxlabsdbdev;

GRANT ALL ON TABLE public.tb_user TO fcxlabsdbdev;