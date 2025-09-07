-- CreateTable
CREATE TABLE "public"."Theme" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "viewportType" TEXT NOT NULL DEFAULT 'color',
    "viewportColor" TEXT,
    "viewportImage" TEXT,
    "viewportGradient" TEXT,
    "cardType" TEXT NOT NULL DEFAULT 'color',
    "cardColor" TEXT,
    "cardImage" TEXT,
    "cardGradient" TEXT,
    "cardBlur" INTEGER,
    "linksBackground" TEXT,
    "linksFontColor" TEXT,
    "linksBorderRadius" INTEGER,
    "linksSpacing" INTEGER,
    "linksHoverColor" TEXT,
    "bioFontColor" TEXT,
    "bioFontSize" INTEGER,
    "bioFontFamily" TEXT,
    "socialsIconColor" TEXT,
    "socialsIconHoverColor" TEXT,
    "socialsSize" INTEGER,
    "profileShape" TEXT NOT NULL DEFAULT 'circle',
    "profileBorderColor" TEXT,
    "profileBorderWidth" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Theme" ADD CONSTRAINT "Theme_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
