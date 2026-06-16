ALTER TABLE "Vehicle"
ADD COLUMN "account_id" TEXT;

CREATE INDEX "Vehicle_account_id_idx" ON "Vehicle"("account_id");
CREATE INDEX "Vehicle_account_id_user_id_idx" ON "Vehicle"("account_id", "user_id");
