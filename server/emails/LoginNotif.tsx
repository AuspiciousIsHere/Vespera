// emails/LoginNotification.tsx
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from "@react-email/components";
import * as React from "react";

interface LoginEmailProps {
  username: string;
  loginDate: string;
  device: string;
  location?: string; // Optional: if you have IP-based location
}

export default function LoginNotificationEmail({ username, loginDate, device }: LoginEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New login detected for {username}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Login Detected</Heading>
          <Text style={text}>Hi {username},</Text>
          <Text style={text}>We noticed a new login to your account. If this was you, you can safely disregard this email.</Text>

          <Section style={detailsSection}>
            <Text style={detailText}>
              <strong>Time:</strong> {loginDate}
            </Text>
            <Text style={detailText}>
              <strong>Device:</strong> {device}
            </Text>
          </Section>

          <Text style={text}>If you did not perform this action, please secure your account immediately:</Text>

          <Link href="https://your-app.com/support" style={button}>
            Contact Support
          </Link>

          <Hr style={hr} />
          <Text style={footer}>This is an automated security notification from YourApp.</Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = { backgroundColor: "#f6f9fc", fontFamily: "sans-serif" };
const container = { backgroundColor: "#ffffff", margin: "0 auto", padding: "20px 0 48px", marginBottom: "64px" };
const h1 = { color: "#333", fontSize: "24px", fontWeight: "bold", textAlign: "center" as const };
const text = { color: "#555", fontSize: "16px", lineHeight: "26px", textAlign: "left" as const, padding: "0 40px" };
const detailsSection = { background: "#f4f4f4", borderRadius: "4px", margin: "24px 40px", padding: "16px" };
const detailText = { fontSize: "14px", margin: "4px 0" };
const button = {
  backgroundColor: "#007ee6",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
  margin: "20px 40px",
};
const hr = { borderColor: "#e6ebf1", margin: "20px 0" };
const footer = { color: "#8898aa", fontSize: "12px", textAlign: "center" as const };
