import { Body, Button, Container, Head, Html, Preview, Section, Text } from "@react-email/components";

interface ResetPasswordProps {
  firstName: string;
  url: string;
}

export default function ResetPassword({ firstName, url }: ResetPasswordProps) {
  return (
    <Html>
      <Head />
      <Body className="bg-[#f6f9fc] py-2.5">
        <Preview>Dropbox reset your password</Preview>
        <Container className="bg-white border border-solid border-[#f0f0f0] p-[45px]">
          <Section>
            <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">Hi {firstName},</Text>
            <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
              Someone recently requested a password change for your Dropbox account. If this was you, you can set a new password here:
            </Text>
            <Button
              className="bg-[#007ee6] rounded text-white text-[15px] no-underline text-center font-dropbox-sans block w-[210px] py-[14px] px-[7px]"
              href={url}
            >
              Reset password
            </Button>
            <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
              If you don&apos;t want to change your password or didn&apos;t request this, just ignore and delete this message.
            </Text>
            <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
              To keep your account secure, please don&apos;t forward this email to anyone. See our Help Center for{" "}
            </Text>
            <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">Happy Dropboxing!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
