BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Employees] (
    [id] INT NOT NULL IDENTITY(1,1),
    [fistName] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [birthday] DATETIME2,
    [email] NVARCHAR(1000) NOT NULL,
    [numberPhone] NVARCHAR(1000) NOT NULL,
    [address] NVARCHAR(1000),
    [password] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Employees_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Employees_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [Employees_numberPhone_key] UNIQUE NONCLUSTERED ([numberPhone])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
