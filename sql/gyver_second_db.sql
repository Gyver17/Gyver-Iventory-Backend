CREATE TABLE "products" (
  "id" varchar PRIMARY KEY,
  "code" varchar UNIQUE NOT NULL,
  "name" varchar NOT NULL,
  "id_category" varchar NOT NULL,
  "quantity" numeric NOT NULL,
  "price_buy" numeric NOT NULL,
  "price_sell" numeric NOT NULL
);

CREATE TABLE "category" (
  "id" varchar PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL,
  "unit" boolean NOT NULL
);

CREATE TABLE "services" (
  "id" varchar PRIMARY KEY,
  "code" varchar UNIQUE NOT NULL,
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  "unit_symbol" varchar NOT NULL,
  "price_unit" numeric NOT NULL
);

CREATE TABLE "services_sell" (
  "id" varchar PRIMARY KEY,
  "id_services" varchar NOT NULL,
  "quantity" numeric NOT NULL,
  "price_total" numeric NOT NULL,
  "id_invoice" varchar NOT NULL,
  "description" varchar NOT NULL,
  "id_employee" varchar NOT NULL
);

CREATE TABLE "money" (
  "id" varchar PRIMARY KEY,
  "name" varchar UNIQUE NOT NULL,
  "symbol" varchar NOT NULL,
  "value" numeric NOT NULL
);

CREATE TABLE "users" (
  "id" varchar PRIMARY KEY,
  "rol" varchar NOT NULL,
  "name" varchar NOT NULL,
  "mail" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL
);

CREATE TABLE "setting" (
  "id" varchar PRIMARY KEY,
  "id_money_1" varchar NOT NULL,
  "id_money_2" varchar NOT NULL,
  "qty_decimal" integer NOT NULL,
  "number_format" varchar NOT NULL,
  "company_name" varchar NOT NULL,
  "company_rif" varchar NOT NULL,
  "company_mail" varchar NOT NULL,
  "company_phone_first" varchar NOT NULL,
  "company_phone_second" varchar NOT NULL,
  "company_photo" varchar NOT NULL,
  "iva" numeric NOT NULL
);

CREATE TABLE "permissions" (
  "id" varchar PRIMARY KEY,
  "id_user" varchar UNIQUE NOT NULL,
  "products" boolean NOT NULL,
  "products_create" boolean NOT NULL,
  "products_update" boolean NOT NULL,
  "products_delete" boolean NOT NULL,
  "category" boolean NOT NULL,
  "category_create" boolean NOT NULL,
  "category_update" boolean NOT NULL,
  "category_delete" boolean NOT NULL,
  "services" boolean NOT NULL,
  "services_create" boolean NOT NULL,
  "services_update" boolean NOT NULL,
  "services_delete" boolean NOT NULL,
  "client" boolean NOT NULL,
  "client_create" boolean NOT NULL,
  "client_update" boolean NOT NULL,
  "client_delete" boolean NOT NULL,
  "supplier" boolean NOT NULL,
  "supplier_create" boolean NOT NULL,
  "supplier_update" boolean NOT NULL,
  "supplier_delete" boolean NOT NULL,
  "employee" boolean NOT NULL,
  "employee_create" boolean NOT NULL,
  "employee_update" boolean NOT NULL,
  "employee_delete" boolean NOT NULL,
  "buy" boolean NOT NULL,
  "buy_return" boolean NOT NULL,
  "buy_pay" boolean NOT NULL,
  "sell" boolean NOT NULL,
  "sell_return" boolean NOT NULL,
  "sell_pay" boolean NOT NULL,
  "consult_product" boolean NOT NULL,
  "consult_invoice" boolean NOT NULL,
  "consult_movement" boolean NOT NULL,
  "consult_supplier" boolean NOT NULL,
  "consult_client" boolean NOT NULL,
  "setting" boolean NOT NULL
);

CREATE TABLE "supplier" (
  "id" varchar PRIMARY KEY,
  "code" varchar UNIQUE NOT NULL,
  "name" varchar NOT NULL,
  "doc_id" varchar UNIQUE NOT NULL,
  "mail" varchar NOT NULL,
  "phone" varchar NOT NULL
);

CREATE TABLE "client" (
  "id" varchar PRIMARY KEY,
  "code" varchar UNIQUE NOT NULL,
  "name" varchar NOT NULL,
  "doc_id" varchar UNIQUE NOT NULL,
  "mail" varchar NOT NULL,
  "phone" varchar NOT NULL
);

CREATE TABLE "employee" (
  "id" varchar PRIMARY KEY,
  "code" varchar UNIQUE NOT NULL,
  "name" varchar NOT NULL,
  "doc_id" varchar UNIQUE NOT NULL,
  "mail" varchar NOT NULL,
  "phone" varchar NOT NULL,
  "salary" numeric NOT NULL,
  "com_sell" numeric NOT NULL,
  "com_service" numeric NOT NULL
);

CREATE TABLE "invoice_buy" (
  "id" varchar PRIMARY KEY,
  "number" varchar NOT NULL,
  "id_supplier" varchar NOT NULL,
  "id_employee" varchar NOT NULL,
  "price_sub" numeric NOT NULL,
  "price_porcent" numeric NOT NULL,
  "price_iva" numeric NOT NULL,
  "price_total" numeric NOT NULL,
  "date" date NOT NULL,
  "description" varchar NOT NULL,
  "pay_type" varchar NOT NULL,
  "pay_debit" numeric NOT NULL,
  "pay_cash" numeric NOT NULL,
  "credit" varchar NOT NULL,
  "amount_pay" numeric,
  "amount_remaining" numeric,
  "observation" varchar
);

CREATE TABLE "product_buy" (
  "id" varchar PRIMARY KEY,
  "id_product" varchar NOT NULL,
  "quantity" numeric NOT NULL,
  "price_total" numeric NOT NULL,
  "id_invoice" varchar NOT NULL,
  "description" varchar NOT NULL
);

CREATE TABLE "invoice_sell" (
  "id" varchar PRIMARY KEY,
  "number" varchar NOT NULL,
  "id_client" varchar NOT NULL,
  "id_employee" varchar NOT NULL,
  "price_sub" numeric NOT NULL,
  "price_porcent" numeric NOT NULL,
  "price_iva" numeric NOT NULL,
  "price_total" numeric NOT NULL,
  "date" date NOT NULL,
  "description" varchar NOT NULL,
  "pay_type" varchar NOT NULL,
  "pay_debit" numeric NOT NULL,
  "pay_cash" numeric NOT NULL,
  "credit" varchar NOT NULL,
  "amount_pay" numeric,
  "amount_remaining" numeric,
  "observation" varchar
);

CREATE TABLE "product_sell" (
  "id" varchar PRIMARY KEY,
  "id_product" varchar NOT NULL,
  "quantity" numeric NOT NULL,
  "price_total" numeric NOT NULL,
  "id_invoice" varchar NOT NULL,
  "description" varchar NOT NULL
);

CREATE TABLE "numbers_invoice" (
  "id" varchar PRIMARY KEY,
  "buy" integer NOT NULL,
  "sell" integer NOT NULL
);

CREATE TABLE "pay_purchases_history" (
  "id" varchar PRIMARY KEY,
  "id_invoice" varchar NOT NULL,
  "date" date NOT NULL,
  "amount" numeric NOT NULL
);

CREATE TABLE "pay_sales_history" (
  "id" varchar PRIMARY KEY,
  "id_invoice" varchar NOT NULL,
  "date" date NOT NULL,
  "amount" numeric NOT NULL
);

CREATE TABLE "sessions" (
  "id" varchar PRIMARY KEY,
  "id_user" varchar UNIQUE NOT NULL,
  "secret_key" varchar UNIQUE
);

ALTER TABLE "products" ADD FOREIGN KEY ("id_category") REFERENCES "category" ("id");

ALTER TABLE "product_buy" ADD FOREIGN KEY ("id_product") REFERENCES "products" ("id");

ALTER TABLE "product_sell" ADD FOREIGN KEY ("id_product") REFERENCES "products" ("id");

ALTER TABLE "product_buy" ADD FOREIGN KEY ("id_invoice") REFERENCES "invoice_buy" ("id");

ALTER TABLE "product_sell" ADD FOREIGN KEY ("id_invoice") REFERENCES "invoice_sell" ("id");

ALTER TABLE "invoice_sell" ADD FOREIGN KEY ("id_client") REFERENCES "client" ("id");

ALTER TABLE "invoice_sell" ADD FOREIGN KEY ("id_employee") REFERENCES "employee" ("id");

ALTER TABLE "invoice_buy" ADD FOREIGN KEY ("id_supplier") REFERENCES "supplier" ("id");

ALTER TABLE "invoice_buy" ADD FOREIGN KEY ("id_employee") REFERENCES "employee" ("id");

ALTER TABLE "permissions" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");

ALTER TABLE "services_sell" ADD FOREIGN KEY ("id_services") REFERENCES "services" ("id");

-- ALTER TABLE "invoice_sell" ADD FOREIGN KEY ("id") REFERENCES "services_sell" ("id_invoice");

ALTER TABLE "services_sell" ADD FOREIGN KEY ("id_employee") REFERENCES "employee" ("id");

ALTER TABLE "setting" ADD FOREIGN KEY ("id_money_1") REFERENCES "money" ("id");

ALTER TABLE "setting" ADD FOREIGN KEY ("id_money_2") REFERENCES "money" ("id");

ALTER TABLE "pay_sales_history" ADD FOREIGN KEY ("id_invoice") REFERENCES "invoice_sell" ("id");

ALTER TABLE "pay_purchases_history" ADD FOREIGN KEY ("id_invoice") REFERENCES "invoice_buy" ("id");

ALTER TABLE "sessions" ADD FOREIGN KEY ("id_user") REFERENCES "users"("id");

ALTER TABLE "services_sell" ADD FOREIGN KEY ("id_invoice") REFERENCES "invoice_sell" ("id");