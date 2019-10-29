PGDMP     (        	        	    w         	   lab_dream    12.0    12.0 K    j           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            k           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            l           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            m           1262    16393 	   lab_dream    DATABASE     �   CREATE DATABASE lab_dream WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Polish_Poland.1250' LC_CTYPE = 'Polish_Poland.1250';
    DROP DATABASE lab_dream;
                postgres    false            �           1247    24630    devtype    TYPE     i   CREATE TYPE public.devtype AS ENUM (
    'hardware',
    'software',
    'network',
    'peripherals'
);
    DROP TYPE public.devtype;
       public          postgres    false            �           1247    24714    priority    TYPE     O   CREATE TYPE public.priority AS ENUM (
    'high',
    'standard',
    'low'
);
    DROP TYPE public.priority;
       public          postgres    false            M           1247    24597    role    TYPE     L   CREATE TYPE public.role AS ENUM (
    'user',
    'service',
    'admin'
);
    DROP TYPE public.role;
       public          postgres    false            �           1247    24707    state    TYPE     T   CREATE TYPE public.state AS ENUM (
    'awaiting',
    'in repair',
    'solved'
);
    DROP TYPE public.state;
       public          postgres    false            �            1259    24641    device    TABLE     �   CREATE TABLE public.device (
    id_d integer NOT NULL,
    type public.devtype,
    brand character(20),
    model character(15),
    lab character(5)
);
    DROP TABLE public.device;
       public         heap    postgres    false    651            �            1259    24639    device_id_d_seq    SEQUENCE     �   CREATE SEQUENCE public.device_id_d_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.device_id_d_seq;
       public          postgres    false    209            n           0    0    device_id_d_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.device_id_d_seq OWNED BY public.device.id_d;
          public          postgres    false    208            �            1259    24723    issue    TABLE       CREATE TABLE public.issue (
    id_i integer NOT NULL,
    descr text,
    notif_d timestamp without time zone,
    state public.state,
    priority public.priority,
    accept_d timestamp without time zone,
    solve_d timestamp without time zone,
    solver_id integer
);
    DROP TABLE public.issue;
       public         heap    postgres    false    665    662            �            1259    24721    issue_id_i_seq    SEQUENCE     �   CREATE SEQUENCE public.issue_id_i_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.issue_id_i_seq;
       public          postgres    false    213            o           0    0    issue_id_i_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.issue_id_i_seq OWNED BY public.issue.id_i;
          public          postgres    false    212            �            1259    24757    rel_id    TABLE     `   CREATE TABLE public.rel_id (
    id_rid integer NOT NULL,
    id_i integer,
    id_d integer
);
    DROP TABLE public.rel_id;
       public         heap    postgres    false            �            1259    24755    rel_id_id_rid_seq    SEQUENCE     �   CREATE SEQUENCE public.rel_id_id_rid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.rel_id_id_rid_seq;
       public          postgres    false    217            p           0    0    rel_id_id_rid_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.rel_id_id_rid_seq OWNED BY public.rel_id.id_rid;
          public          postgres    false    216            �            1259    24690    rel_ud    TABLE     d   CREATE TABLE public.rel_ud (
    id_rud integer NOT NULL,
    id_u integer,
    lab character(5)
);
    DROP TABLE public.rel_ud;
       public         heap    postgres    false            �            1259    24688    rel_ud_id_rud_seq    SEQUENCE     �   CREATE SEQUENCE public.rel_ud_id_rud_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.rel_ud_id_rud_seq;
       public          postgres    false    211            q           0    0    rel_ud_id_rud_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.rel_ud_id_rud_seq OWNED BY public.rel_ud.id_rud;
          public          postgres    false    210            �            1259    24739    rel_ui    TABLE     `   CREATE TABLE public.rel_ui (
    id_rui integer NOT NULL,
    id_u integer,
    id_i integer
);
    DROP TABLE public.rel_ui;
       public         heap    postgres    false            �            1259    24737    rel_ui_id_rui_seq    SEQUENCE     �   CREATE SEQUENCE public.rel_ui_id_rui_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.rel_ui_id_rui_seq;
       public          postgres    false    215            r           0    0    rel_ui_id_rui_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.rel_ui_id_rui_seq OWNED BY public.rel_ui.id_rui;
          public          postgres    false    214            �            1259    24613    rel_us    TABLE     `   CREATE TABLE public.rel_us (
    id_rus integer NOT NULL,
    id_u integer,
    id_s integer
);
    DROP TABLE public.rel_us;
       public         heap    postgres    false            �            1259    24611    rel_us_id_rus_seq    SEQUENCE     �   CREATE SEQUENCE public.rel_us_id_rus_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.rel_us_id_rus_seq;
       public          postgres    false    207            s           0    0    rel_us_id_rus_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.rel_us_id_rus_seq OWNED BY public.rel_us.id_rus;
          public          postgres    false    206            �            1259    24588    sensitive_data    TABLE     �   CREATE TABLE public.sensitive_data (
    id_s integer NOT NULL,
    login character(20) NOT NULL,
    password character(30) NOT NULL
);
 "   DROP TABLE public.sensitive_data;
       public         heap    postgres    false            �            1259    24586    sensitive_data_id_s_seq    SEQUENCE     �   CREATE SEQUENCE public.sensitive_data_id_s_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.sensitive_data_id_s_seq;
       public          postgres    false    203            t           0    0    sensitive_data_id_s_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.sensitive_data_id_s_seq OWNED BY public.sensitive_data.id_s;
          public          postgres    false    202            �            1259    24605    users    TABLE     �   CREATE TABLE public.users (
    id_u integer NOT NULL,
    name character(20),
    lastname character(30),
    company character(20),
    role public.role
);
    DROP TABLE public.users;
       public         heap    postgres    false    589            �            1259    24603    users_id_u_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_u_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.users_id_u_seq;
       public          postgres    false    205            u           0    0    users_id_u_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.users_id_u_seq OWNED BY public.users.id_u;
          public          postgres    false    204            �
           2604    24644    device id_d    DEFAULT     j   ALTER TABLE ONLY public.device ALTER COLUMN id_d SET DEFAULT nextval('public.device_id_d_seq'::regclass);
 :   ALTER TABLE public.device ALTER COLUMN id_d DROP DEFAULT;
       public          postgres    false    209    208    209            �
           2604    24726 
   issue id_i    DEFAULT     h   ALTER TABLE ONLY public.issue ALTER COLUMN id_i SET DEFAULT nextval('public.issue_id_i_seq'::regclass);
 9   ALTER TABLE public.issue ALTER COLUMN id_i DROP DEFAULT;
       public          postgres    false    213    212    213            �
           2604    24760    rel_id id_rid    DEFAULT     n   ALTER TABLE ONLY public.rel_id ALTER COLUMN id_rid SET DEFAULT nextval('public.rel_id_id_rid_seq'::regclass);
 <   ALTER TABLE public.rel_id ALTER COLUMN id_rid DROP DEFAULT;
       public          postgres    false    217    216    217            �
           2604    24693    rel_ud id_rud    DEFAULT     n   ALTER TABLE ONLY public.rel_ud ALTER COLUMN id_rud SET DEFAULT nextval('public.rel_ud_id_rud_seq'::regclass);
 <   ALTER TABLE public.rel_ud ALTER COLUMN id_rud DROP DEFAULT;
       public          postgres    false    210    211    211            �
           2604    24742    rel_ui id_rui    DEFAULT     n   ALTER TABLE ONLY public.rel_ui ALTER COLUMN id_rui SET DEFAULT nextval('public.rel_ui_id_rui_seq'::regclass);
 <   ALTER TABLE public.rel_ui ALTER COLUMN id_rui DROP DEFAULT;
       public          postgres    false    215    214    215            �
           2604    24616    rel_us id_rus    DEFAULT     n   ALTER TABLE ONLY public.rel_us ALTER COLUMN id_rus SET DEFAULT nextval('public.rel_us_id_rus_seq'::regclass);
 <   ALTER TABLE public.rel_us ALTER COLUMN id_rus DROP DEFAULT;
       public          postgres    false    207    206    207            �
           2604    24591    sensitive_data id_s    DEFAULT     z   ALTER TABLE ONLY public.sensitive_data ALTER COLUMN id_s SET DEFAULT nextval('public.sensitive_data_id_s_seq'::regclass);
 B   ALTER TABLE public.sensitive_data ALTER COLUMN id_s DROP DEFAULT;
       public          postgres    false    203    202    203            �
           2604    24608 
   users id_u    DEFAULT     h   ALTER TABLE ONLY public.users ALTER COLUMN id_u SET DEFAULT nextval('public.users_id_u_seq'::regclass);
 9   ALTER TABLE public.users ALTER COLUMN id_u DROP DEFAULT;
       public          postgres    false    204    205    205            _          0    24641    device 
   TABLE DATA           ?   COPY public.device (id_d, type, brand, model, lab) FROM stdin;
    public          postgres    false    209   ;Q       c          0    24723    issue 
   TABLE DATA           d   COPY public.issue (id_i, descr, notif_d, state, priority, accept_d, solve_d, solver_id) FROM stdin;
    public          postgres    false    213   XQ       g          0    24757    rel_id 
   TABLE DATA           4   COPY public.rel_id (id_rid, id_i, id_d) FROM stdin;
    public          postgres    false    217   uQ       a          0    24690    rel_ud 
   TABLE DATA           3   COPY public.rel_ud (id_rud, id_u, lab) FROM stdin;
    public          postgres    false    211   �Q       e          0    24739    rel_ui 
   TABLE DATA           4   COPY public.rel_ui (id_rui, id_u, id_i) FROM stdin;
    public          postgres    false    215   �Q       ]          0    24613    rel_us 
   TABLE DATA           4   COPY public.rel_us (id_rus, id_u, id_s) FROM stdin;
    public          postgres    false    207   �Q       Y          0    24588    sensitive_data 
   TABLE DATA           ?   COPY public.sensitive_data (id_s, login, password) FROM stdin;
    public          postgres    false    203   �Q       [          0    24605    users 
   TABLE DATA           D   COPY public.users (id_u, name, lastname, company, role) FROM stdin;
    public          postgres    false    205   R       v           0    0    device_id_d_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.device_id_d_seq', 1, false);
          public          postgres    false    208            w           0    0    issue_id_i_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.issue_id_i_seq', 1, false);
          public          postgres    false    212            x           0    0    rel_id_id_rid_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.rel_id_id_rid_seq', 1, false);
          public          postgres    false    216            y           0    0    rel_ud_id_rud_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.rel_ud_id_rud_seq', 1, false);
          public          postgres    false    210            z           0    0    rel_ui_id_rui_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.rel_ui_id_rui_seq', 1, false);
          public          postgres    false    214            {           0    0    rel_us_id_rus_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.rel_us_id_rus_seq', 1, false);
          public          postgres    false    206            |           0    0    sensitive_data_id_s_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.sensitive_data_id_s_seq', 1, false);
          public          postgres    false    202            }           0    0    users_id_u_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.users_id_u_seq', 1, false);
          public          postgres    false    204            �
           2606    24646    device device_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.device
    ADD CONSTRAINT device_pkey PRIMARY KEY (id_d);
 <   ALTER TABLE ONLY public.device DROP CONSTRAINT device_pkey;
       public            postgres    false    209            �
           2606    24731    issue issue_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.issue
    ADD CONSTRAINT issue_pkey PRIMARY KEY (id_i);
 :   ALTER TABLE ONLY public.issue DROP CONSTRAINT issue_pkey;
       public            postgres    false    213            �
           2606    24762    rel_id rel_id_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.rel_id
    ADD CONSTRAINT rel_id_pkey PRIMARY KEY (id_rid);
 <   ALTER TABLE ONLY public.rel_id DROP CONSTRAINT rel_id_pkey;
       public            postgres    false    217            �
           2606    24695    rel_ud rel_ud_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.rel_ud
    ADD CONSTRAINT rel_ud_pkey PRIMARY KEY (id_rud);
 <   ALTER TABLE ONLY public.rel_ud DROP CONSTRAINT rel_ud_pkey;
       public            postgres    false    211            �
           2606    24744    rel_ui rel_ui_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.rel_ui
    ADD CONSTRAINT rel_ui_pkey PRIMARY KEY (id_rui);
 <   ALTER TABLE ONLY public.rel_ui DROP CONSTRAINT rel_ui_pkey;
       public            postgres    false    215            �
           2606    24618    rel_us rel_us_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.rel_us
    ADD CONSTRAINT rel_us_pkey PRIMARY KEY (id_rus);
 <   ALTER TABLE ONLY public.rel_us DROP CONSTRAINT rel_us_pkey;
       public            postgres    false    207            �
           2606    24595 '   sensitive_data sensitive_data_login_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.sensitive_data
    ADD CONSTRAINT sensitive_data_login_key UNIQUE (login);
 Q   ALTER TABLE ONLY public.sensitive_data DROP CONSTRAINT sensitive_data_login_key;
       public            postgres    false    203            �
           2606    24593 "   sensitive_data sensitive_data_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.sensitive_data
    ADD CONSTRAINT sensitive_data_pkey PRIMARY KEY (id_s);
 L   ALTER TABLE ONLY public.sensitive_data DROP CONSTRAINT sensitive_data_pkey;
       public            postgres    false    203            �
           2606    24610    users users_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_u);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    205            �
           1259    24687 	   lab_index    INDEX     B   CREATE UNIQUE INDEX lab_index ON public.device USING btree (lab);
    DROP INDEX public.lab_index;
       public            postgres    false    209            �
           2606    24732    issue issue_solver_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.issue
    ADD CONSTRAINT issue_solver_id_fkey FOREIGN KEY (solver_id) REFERENCES public.users(id_u);
 D   ALTER TABLE ONLY public.issue DROP CONSTRAINT issue_solver_id_fkey;
       public          postgres    false    213    2755    205            �
           2606    24768    rel_id rel_id_id_d_fkey    FK CONSTRAINT     v   ALTER TABLE ONLY public.rel_id
    ADD CONSTRAINT rel_id_id_d_fkey FOREIGN KEY (id_d) REFERENCES public.device(id_d);
 A   ALTER TABLE ONLY public.rel_id DROP CONSTRAINT rel_id_id_d_fkey;
       public          postgres    false    2759    209    217            �
           2606    24763    rel_id rel_id_id_i_fkey    FK CONSTRAINT     u   ALTER TABLE ONLY public.rel_id
    ADD CONSTRAINT rel_id_id_i_fkey FOREIGN KEY (id_i) REFERENCES public.issue(id_i);
 A   ALTER TABLE ONLY public.rel_id DROP CONSTRAINT rel_id_id_i_fkey;
       public          postgres    false    213    217    2764            �
           2606    24696    rel_ud rel_ud_id_u_fkey    FK CONSTRAINT     u   ALTER TABLE ONLY public.rel_ud
    ADD CONSTRAINT rel_ud_id_u_fkey FOREIGN KEY (id_u) REFERENCES public.users(id_u);
 A   ALTER TABLE ONLY public.rel_ud DROP CONSTRAINT rel_ud_id_u_fkey;
       public          postgres    false    211    2755    205            �
           2606    24701    rel_ud rel_ud_lab_fkey    FK CONSTRAINT     s   ALTER TABLE ONLY public.rel_ud
    ADD CONSTRAINT rel_ud_lab_fkey FOREIGN KEY (lab) REFERENCES public.device(lab);
 @   ALTER TABLE ONLY public.rel_ud DROP CONSTRAINT rel_ud_lab_fkey;
       public          postgres    false    209    211    2760            �
           2606    24750    rel_ui rel_ui_id_i_fkey    FK CONSTRAINT     u   ALTER TABLE ONLY public.rel_ui
    ADD CONSTRAINT rel_ui_id_i_fkey FOREIGN KEY (id_i) REFERENCES public.issue(id_i);
 A   ALTER TABLE ONLY public.rel_ui DROP CONSTRAINT rel_ui_id_i_fkey;
       public          postgres    false    215    213    2764            �
           2606    24745    rel_ui rel_ui_id_u_fkey    FK CONSTRAINT     u   ALTER TABLE ONLY public.rel_ui
    ADD CONSTRAINT rel_ui_id_u_fkey FOREIGN KEY (id_u) REFERENCES public.users(id_u);
 A   ALTER TABLE ONLY public.rel_ui DROP CONSTRAINT rel_ui_id_u_fkey;
       public          postgres    false    215    205    2755            �
           2606    24624    rel_us rel_us_id_s_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.rel_us
    ADD CONSTRAINT rel_us_id_s_fkey FOREIGN KEY (id_s) REFERENCES public.sensitive_data(id_s);
 A   ALTER TABLE ONLY public.rel_us DROP CONSTRAINT rel_us_id_s_fkey;
       public          postgres    false    207    2753    203            �
           2606    24619    rel_us rel_us_id_u_fkey    FK CONSTRAINT     u   ALTER TABLE ONLY public.rel_us
    ADD CONSTRAINT rel_us_id_u_fkey FOREIGN KEY (id_u) REFERENCES public.users(id_u);
 A   ALTER TABLE ONLY public.rel_us DROP CONSTRAINT rel_us_id_u_fkey;
       public          postgres    false    2755    207    205            _      x������ � �      c      x������ � �      g      x������ � �      a      x������ � �      e      x������ � �      ]      x������ � �      Y      x������ � �      [      x������ � �     