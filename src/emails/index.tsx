import { OrderType } from "@/lib/action";
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import Image from "next/image";
import * as React from "react";

interface YelpRecentLoginEmailProps {
  userFirstName?: string;
  loginDate?: Date;
  loginDevice?: string;
  loginLocation?: string;
  loginIp?: string;
  order: OrderType;
}
const Email = ({ order }: YelpRecentLoginEmailProps) => {
  console.log(" in Email");
  return (
    <Html>
      <Head />
      <Preview>Yelp recent login</Preview>
      <Body style={main}>
        <Container>
          <Section style={content}>
            <Row>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#333",
                  }}
                >
                  Hi {order.fullName || "User"}
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#444",
                    marginBottom: "20px",
                  }}
                >
                  Here are your recent cart items:
                </Heading>
                {order.orderItems.map((item, index) => (
                  <div key={index} style={cartItemStyle}>
                    <Image
                      width={200}
                      height={300}
                      src={item.image}
                      alt={item.name || "Product Image"}
                      style={{
                        width: "100px",
                        height: "110px",
                        borderRadius: "8px",
                      }}
                    />
                    <br />
                    <div className="px-3">
                      <p style={paragraph}>
                        <b>Product:</b> {item.name || "Unknown"}
                      </p>
                      <p style={paragraph}>
                        <b>Color:</b> {item.colors.name || "Unknown"}{" "}
                        <span
                          style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: item.colors.color,
                            borderRadius: "100%",
                          }}
                        ></span>
                      </p>
                      <p style={paragraph}>
                        <b>Price:</b> ${item.price || "0.00"}
                      </p>
                      <p style={paragraph}>
                        <b>Quantity:</b> {item.quantity || 1}
                      </p>
                      {item.quantity > 1 && (
                        <b style={paragraph}>
                          Total price for this item: $
                          {item.quantity * item.price}
                        </b>
                      )}
                    </div>
                  </div>
                ))}
                <Text style={paragraph}>
                  If this was you, there’s nothing else you need to do.
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  If this wasnt you or if you have additional questions, please
                  see our support page.
                </Text>
              </Column>
            </Row>
            <Row>
              <Column style={containerButton} colSpan={2}>
                <a
                  href="#"
                  style={button as React.CSSProperties}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#d00606")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e00707")
                  }
                >
                  Learn More
                </a>
              </Column>
            </Row>
          </Section>
          <Text style={footerTextStyle as React.CSSProperties}>
            © 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105,
            U.S.A. | www.yelp.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles

const main = {
  backgroundColor: "#f9f9f9",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  padding: "20px",
};

const content = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const paragraph = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#333",
  margin: "8px 0",
};

const cartItemStyle = {
  alignItem: "center",

  display: "flex",
  gap: "10px",
  padding: "15px",
  borderBottom: "1px solid #eee",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: "5px",
  color: "#FFF",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
  padding: "12px 30px",
  textAlign: "center",
  textDecoration: "none",
  transition: "background-color 0.3s",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  marginTop: "20px",
};

const footerTextStyle = {
  textAlign: "center",
  fontSize: "12px",
  color: "rgba(0, 0, 0, 0.7)",
  marginTop: "20px",
};
export default Email;
