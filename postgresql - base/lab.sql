PGDMP         
                 x            lab    12.1    12.0      ,           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            -           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            .           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            /           1262    16598    lab    DATABASE     �   CREATE DATABASE lab WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE lab;
                postgres    false                       1247    16600    devtype    TYPE     i   CREATE TYPE public.devtype AS ENUM (
    'hardware',
    'software',
    'network',
    'peripherals'
);
    DROP TYPE public.devtype;
       public          postgres    false            !           1247    16610    priority    TYPE     O   CREATE TYPE public.priority AS ENUM (
    'high',
    'standard',
    'low'
);
    DROP TYPE public.priority;
       public          postgres    false            y           1247    16618    role    TYPE     L   CREATE TYPE public.role AS ENUM (
    'user',
    'service',
    'admin'
);
    DROP TYPE public.role;
       public          postgres    false            |           1247    16626    state    TYPE     T   CREATE TYPE public.state AS ENUM (
    'awaiting',
    'in repair',
    'solved'
);
    DROP TYPE public.state;
       public          postgres    false            �            1259    16633    device    TABLE     �   CREATE TABLE public.device (
    id_d integer NOT NULL,
    lab character varying(5),
    id_i integer,
    type character varying
);
    DROP TABLE public.device;
       public         heap    postgres    false            �            1259    16636    device_id_d_seq    SEQUENCE     �   CREATE SEQUENCE public.device_id_d_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.device_id_d_seq;
       public          postgres    false    202            0           0    0    device_id_d_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.device_id_d_seq OWNED BY public.device.id_d;
          public          postgres    false    203            �            1259    16742    hibernate_sequence    SEQUENCE     {   CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.hibernate_sequence;
       public          postgres    false            �            1259    16638    issue    TABLE     *  CREATE TABLE public.issue (
    id_i integer NOT NULL,
    descr text,
    state character varying,
    priority character varying,
    solver_id integer,
    initiator_id integer,
    notif_d timestamp with time zone,
    accept_d timestamp with time zone,
    solve_d timestamp with time zone
);
    DROP TABLE public.issue;
       public         heap    postgres    false            �            1259    16644    issue_id_i_seq    SEQUENCE     �   CREATE SEQUENCE public.issue_id_i_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.issue_id_i_seq;
       public          postgres    false    204            1           0    0    issue_id_i_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.issue_id_i_seq OWNED BY public.issue.id_i;
          public          postgres    false    205            �            1259    16671    users    TABLE       CREATE TABLE public.users (
    id_u integer NOT NULL,
    name character varying(20),
    lastname character varying(30),
    company character varying(20),
    role character varying(15),
    login character varying(10),
    password character varying(20)
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16674    users_id_u_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_u_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.users_id_u_seq;
       public          postgres    false    206            2           0    0    users_id_u_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.users_id_u_seq OWNED BY public.users.id_u;
          public          postgres    false    207            �
           2604    16676    device id_d    DEFAULT     j   ALTER TABLE ONLY public.device ALTER COLUMN id_d SET DEFAULT nextval('public.device_id_d_seq'::regclass);
 :   ALTER TABLE public.device ALTER COLUMN id_d DROP DEFAULT;
       public          postgres    false    203    202            �
           2604    16677 
   issue id_i    DEFAULT     h   ALTER TABLE ONLY public.issue ALTER COLUMN id_i SET DEFAULT nextval('public.issue_id_i_seq'::regclass);
 9   ALTER TABLE public.issue ALTER COLUMN id_i DROP DEFAULT;
       public          postgres    false    205    204            �
           2604    16683 
   users id_u    DEFAULT     h   ALTER TABLE ONLY public.users ALTER COLUMN id_u SET DEFAULT nextval('public.users_id_u_seq'::regclass);
 9   ALTER TABLE public.users ALTER COLUMN id_u DROP DEFAULT;
       public          postgres    false    207    206            #          0    16633    device 
   TABLE DATA           7   COPY public.device (id_d, lab, id_i, type) FROM stdin;
    public          postgres    false    202   a!       %          0    16638    issue 
   TABLE DATA           r   COPY public.issue (id_i, descr, state, priority, solver_id, initiator_id, notif_d, accept_d, solve_d) FROM stdin;
    public          postgres    false    204   �!       '          0    16671    users 
   TABLE DATA           U   COPY public.users (id_u, name, lastname, company, role, login, password) FROM stdin;
    public          postgres    false    206   s"       3           0    0    device_id_d_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.device_id_d_seq', 133, true);
          public          postgres    false    203            4           0    0    hibernate_sequence    SEQUENCE SET     A   SELECT pg_catalog.setval('public.hibernate_sequence', 1, false);
          public          postgres    false    208            5           0    0    issue_id_i_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.issue_id_i_seq', 64, true);
          public          postgres    false    205            6           0    0    users_id_u_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.users_id_u_seq', 34, true);
          public          postgres    false    207            �
           2606    16685    device device_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.device
    ADD CONSTRAINT device_pkey PRIMARY KEY (id_d);
 <   ALTER TABLE ONLY public.device DROP CONSTRAINT device_pkey;
       public            postgres    false    202            �
           2606    16687    issue issue_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.issue
    ADD CONSTRAINT issue_pkey PRIMARY KEY (id_i);
 :   ALTER TABLE ONLY public.issue DROP CONSTRAINT issue_pkey;
       public            postgres    false    204            �
           2606    16701    users users_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_u);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    206            �
           2606    16702    issue issue_solver_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.issue
    ADD CONSTRAINT issue_solver_id_fkey FOREIGN KEY (solver_id) REFERENCES public.users(id_u);
 D   ALTER TABLE ONLY public.issue DROP CONSTRAINT issue_solver_id_fkey;
       public          postgres    false    204    206    2723            #   0   x�346�426�45�N�I�246�,N.�43�.(�:2��+F��� ��	�      %   �   x���M
�0���Sd/��L�j��&6)D������P����{��+�˵�M��=�m�p��lb:D`b $\�Z���+�F��Z��z�Uh�8�.��(�8�N��s"� �qv�y=�'�x0}z��I�ʼ<L�s�&�4�O"ќXjKF*~Km�?�XI��OT�rDw�{��_hl,�\!�h�,��
�{/      '      x�U��N�0E�7_Q�ѤBbY!@!!6�ԥƎ-��z�w�m�������s�3�u�v��8n����%�O�n�ONab�_\�x�QT%�Մ�`�bC���{ʻ<����A�¦��X����Ȋ�G2�MԆޔ�'�#������R�9#�W}�8�gj3�L��Zqҁ\ĺo�������
��]��\��2�I�a�h����(���r�u��K��$ʶ�X�A0�e���)zF���_}=*������     