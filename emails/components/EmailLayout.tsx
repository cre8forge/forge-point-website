import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Hr,
  Text,
  Img,
  Link,
  Tailwind,
} from "@react-email/components";
import type { ReactNode } from "react";

interface EmailLayoutProps {
  preview?:    string;
  footerText?: string;
  children:    ReactNode;
}

export function EmailLayout({ preview, footerText, children }: EmailLayoutProps) {
  return (
    <Html lang="en">
      <Head>
        <title>Forge Point Property Services</title>
        {preview && <meta name="description" content={preview} />}
      </Head>
      <Tailwind>
        <Body className="bg-slate-50 font-sans m-0 p-0">
          <Container className="mx-auto py-8 max-w-xl">

            {/* Header */}
            <Section className="bg-[#0D1B2A] py-6 px-8 rounded-t-lg text-center">
              <Img
                src="https://cre8forge.com/images/logo-light.png"
                width="140"
                height="40"
                alt="Forge Point Property Services"
                className="mx-auto"
              />
            </Section>

            {/* Body */}
            <Section className="bg-white px-8 py-8 rounded-b-lg">
              {children}
            </Section>

            {/* Footer */}
            <Section className="px-8 py-6">
              <Hr className="border-slate-200 my-0" />
              <Text className="text-xs text-slate-500 text-center mt-4 mb-1">
                Forge Point Property Services · Erie, CO 80516
              </Text>
              <Text className="text-xs text-slate-500 text-center mb-1">
                <Link href="https://cre8forge.com" className="text-[#C85A00]">
                  cre8forge.com
                </Link>
                {" · "}
                <Link href="tel:+17204191961" className="text-[#C85A00]">
                  (720) 419-1961
                </Link>
              </Text>
              {footerText && (
                <Text className="text-xs text-slate-400 text-center mt-3 mb-1">
                  {footerText}
                </Text>
              )}
              <Text className="text-xs text-slate-400 text-center mt-2 mb-0">
                <Link
                  href="https://cre8forge.com/unsubscribe"
                  className="text-slate-500 underline"
                >
                  Unsubscribe
                </Link>
              </Text>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
