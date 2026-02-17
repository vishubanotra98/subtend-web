import * as React from "react";
import {
  Html,
  Body,
  Preview,
  Container,
  Text,
  Hr,
  Button,
  Section,
  Heading,
  Head,
  Font,
} from "@react-email/components";
import { BASE_URL } from "@/lib/utils";

interface InviteProps {
  email: string;
  token: string;
  workspaceId: string;
}

export function UserInvitation({ email, token, workspaceId }: InviteProps) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body className="bg-white font-sans">
        <Preview>Verify your email address for Linear</Preview>
        <Container className="mx-auto my-0 max-w-[560px] px-0 pt-5 pb-12">
          <Heading className="text-[24px] font-normal text-[#3c4149] p-0 my-[30px] mx-0">
            Verify your email address
          </Heading>

          <Text className="text-[15px] leading-[24px] text-[#3c4149]">
            Please click the button below to verify your email address and join
            your workspace.
          </Text>

          <Section className="my-[32px] text-center">
            <Button
              className="bg-[#5F51E8] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
              href={`${BASE_URL}/user-invite?utok=${token}&email=${email}&wid=${workspaceId}`}
            >
              Verify Email Address
            </Button>
          </Section>

          <Text className="text-[14px] leading-[24px] text-[#ababab] mt-[20px]">
            This link will only be valid for the next 24 hours.
          </Text>

          <Hr className="border-[#dfe1e4] mt-[26px] mb-[26px]" />

          <Text className="text-[12px] text-[#b4becc]">
            TaskFlow. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default UserInvitation;
