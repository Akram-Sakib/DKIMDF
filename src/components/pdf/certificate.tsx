/* eslint-disable jsx-a11y/alt-text */
"use client";

import {
  Document,
  Font,
  Image,
  Page,
  Path,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import React from "react";
import SomadhanFoundationLogo from "@/assets/images/somadhan-foundation-logo.png";

// tailwind breakpoints
// const breakpoints = {
//   sm: 640,
//   md: 768,
//   lg: 1024,
//   xl: 1280,
//   "2xl": 1536,
// };

const theme = {
  colors: {
    primary: "#91466A",
    primary2: "#876486",
    secondary: "#3d3d3d",
    secondary2: "#949494",
  },
  spacing: {
    mb: 5,
    mb2: 10,
    mb3: 15,
    mb4: 20,
    mb5: 25,
  },
};
const { primary, secondary, secondary2 } = theme.colors;
const { mb, mb2, mb3 } = theme.spacing;

const CertificatePdf = ({ name }: { name: string }): JSX.Element => {
  Font.register({
    family: "Lato",
    src: "https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf",
  });

  // Create styles
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: "100%",
      height: "100%",
      padding: 40,
      backgroundColor: "#fff",
    },
    page: {
      //   display: "block",
      width: "100%",
    },
    section: {
      width: "100%",
      //   display: "block",
    },
    headingText: {
      fontFamily: "Lato",
      fontSize: 18,
      color: secondary,
      marginBottom: mb,
    },
    title: {
      fontFamily: "Lato",
      fontSize: 14,
      color: secondary,
      marginBottom: mb,
    },
    subtitle: {
      fontFamily: "Lato",
      fontSize: 11,
      color: secondary,
      marginBottom: mb,
    },
    text: {
      // fontFamily: "Poppins",
      fontSize: 8,
      color: secondary2,
      marginBottom: 5,
      lineHeight: 1.3,
    },
  });

  return (
    <Document title="Certificate" subject="Certificate Subject">
      {/* <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.container}>
          <View style={[styles.section, { marginBottom: 30 }]}>
            <Text style={styles.headingText}>Your receipt from Roam</Text>
            <Text style={styles.text}>
              Receipt ID: RCYNPDWEZE • {format(new Date(), "MMMM d, yyyy")}
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", columnGap: 20 }}
          >
            <View
              style={{
                border: "1px solid #949494",
                padding: 30,
                borderRadius: 5,
                flexBasis: "50%",
              }}
            >
              <Text style={[styles.title, { marginBottom: mb2 }]}>Name</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 5,
                  marginBottom: mb2,
                  paddingBottom: 5,
                  borderBottom: "1px solid #949494",
                }}
              >
                <Text style={styles.text}>5 nights</Text>
                <Text style={styles.text}>Dhaka, Bangladesh</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={{ marginBottom: mb }}>
                  <Text style={styles.text}>
                    {format(new Date(), "eee, MMM d")}
                  </Text>
                  <Text style={styles.text}>
                    {format(new Date(), "h:mm a")}
                  </Text>
                </View>
                <Svg
                  viewBox="0 0 14 24"
                  style={{ width: 7, height: 12 }}
                >
                  <Path
                    d="M3.01494 23.7656L12.1258 14.6423C12.7527 14.0125 13.1046 13.16 13.1046 12.2714C13.1046 11.3827 12.7527 10.5303 12.1258 9.90046L3.0044 0.765625L0.976562 2.79825L10.098 11.9321C10.1878 12.022 10.2383 12.1438 10.2383 12.2709C10.2383 12.398 10.1878 12.5198 10.098 12.6097L0.986146 21.733L3.01494 23.7656Z"
                    fill="#876486"
                  />
                </Svg>

                <View>
                  <Text style={styles.text}>
                    {format(new Date(), "eee, MMM d")}
                  </Text>
                  <Text style={styles.text}>
                    {format(new Date(), "p")}
                  </Text>
                </View>
              </View>
              <Text
                style={[styles.subtitle, { marginBottom: mb2, fontSize: 9 }]}
              >
                Entire home/apt - 5 bed • 2 guest
              </Text>
              <Text style={[styles.text, { marginBottom: mb2 }]}>
                Hosted by (Name)
              </Text>
              <Text
                style={[styles.subtitle, { marginBottom: mb2, fontSize: 9 }]}
              >
                Confirmation code: HMSSCKOJ
              </Text>
              <Text
                style={[
                  styles.subtitle,
                  {
                    color: primary,
                    borderBottom: "1px solid #949494",
                    paddingBottom: 5,
                    marginBottom: mb2,
                    fontSize: 9,
                  },
                ]}
              >
                Go to itinerary • Go to istng
              </Text>
              <Text style={[styles.text, { marginBottom: mb2 }]}>
                Traveler : (Cobbler)
              </Text>
              <Text
                style={[styles.subtitle, { marginBottom: mb2, fontSize: 9 }]}
              >
                Cancellation policy
              </Text>
              <Text style={styles.text}>
                Cancel before 3000 PM on Oct 19 and only get a refund of the
                Cieening lee.{" "}
                <Text style={{ color: primary }}>More detail</Text> Cutoff times
                are hased on the listing&apos;s local time
              </Text>
            </View>
            <View style={{ flexBasis: "50%" }}>
              <View
                style={{
                  border: "1px solid #949494",
                  padding: 30,
                  paddingVertical: 35,
                  borderRadius: 5,
                  marginBottom: mb3,
                }}
              >
                <Text style={[styles.subtitle]}>Price Breakdown</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 5,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.text}>
                    ${1} x {5} nights
                  </Text>
                  <Text style={styles.text}>${5000}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 5,
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #949494",
                    paddingBottom: 5,
                  }}
                >
                  <Text style={styles.text}>Service fee</Text>
                  <Text style={styles.text}>${5222}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 5,
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <Text style={[styles.text, { color: secondary }]}>
                    Total (USD)
                  </Text>
                  <Text style={[styles.text, { color: secondary }]}>
                    ${52334}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  border: "1px solid #949494",
                  padding: 30,
                  borderRadius: 5,
                  paddingVertical: 35,
                }}
              >
                <Text style={styles.subtitle}>Payment</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 5,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.text}>VISA --5472</Text>
                  <Text style={styles.text}>$81.28</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 5,
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #949494",
                    paddingBottom: 5,
                  }}
                >
                  <Text style={styles.text}>
                    {format(new Date(), "MMMM d, yyyy")} •{" "}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 5,
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <Text style={[styles.text, { color: secondary }]}>
                    Amount paid(USD)
                  </Text>
                  <Text style={[styles.text, { color: secondary }]}>
                    ${754}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              padding: 10,
            }}
          >
            <Text style={styles.text}>Have a question?</Text>
            <Text style={styles.text}>
              Visit the <Text style={{ color: primary }}>Help Center</Text>
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              marginVertical: 30,
              borderBottom: "1px solid #949494",
            }}
          />
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Text style={styles.subtitle}>Roam servico fee</Text>
            <Text style={styles.text}>
              Includes applicable VAT charges,{" "}
              <Text style={{ color: primary }}>
                Go to Payment Detals to view VAT Invoice
              </Text>
            </Text>
          </View>
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Text style={styles.subtitle}>Roam Payments, Inc.</Text>
            <Text style={styles.text}>
              Roam Payments is a limited payment colection agent of your Host It
              meens thal upon your payment of the Total Fees to Airbnb Payments,
              your payment obligation to your Host in satisfind. Rafund requests
              will ba processed in accordance with () the Hosts cancelation
              policy (available on the Listing); er (I) Airbnb: Guest Rafund
              Policy Terma, avalable at{" "}
              <Text style={{ color: primary }}>www.</Text> Questions or
              complaints: contact Airbnb Payments, Inc at +1 (844) 234-2500.
            </Text>
          </View>
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Text style={styles.subtitle}>Security Deposit</Text>
            <Text style={styles.text}>
              Your Host requires a Security Deposit of $300.00 to book this
              ising. The Guest is responsible for the amount of the Security
              Deposit, but it will not be charged unless the host makes a claim.
              Hosts con male a claim on the deposit within 14 days of your
              chockout date or before the next guest checks in, whichever is
              carlier. If a claim la initiated, Airbrib Customer Service will be
              in contact with both you and your Host to make sure both parties
              are represented fairly. Additional de tais regarding the Security
              Deposit are availabla at https://www.arbrib.com/help/artide/140.
            </Text>
          </View>
          <View
            style={{
              borderBottom: "1px solid #949494",
              marginVertical: 20,
              width: "100%",
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: 50,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.text}>Payment processed by:</Text>
              <Text style={styles.text}>Roam Payments, Inc.</Text>
              <Text style={styles.text}>
                884 Brannan Strody&gt;San Francisco, CA. 94103
              </Text>
              <Text style={styles.text}>
                88B Brannan St. San Francisco, CA. 94103
              </Text>
            </View>
            <View>
              <Text style={styles.text}>Roam Payments, Inc.</Text>
              <Text style={styles.text}>
                Airbnb, he. 88B Brannan St. San Francisco,{" "}
              </Text>
              <Text style={styles.text}>CA. 94103</Text>
            </View>

          </View>
        </View>
      </Page> */}
      {/* <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.container}>
          <View
            style={[
              styles.section,
              {
                marginBottom: 30,
                paddingBottom: 30,
                borderBottom: "1px solid #949494",
              },
            ]}
          >
            <Text style={[styles.headingText, { color: "#000" }]}>
              Cobbler, Dhaka, Bangladesh
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
              paddingBottom: 30,
              borderBottom: "1px solid #949494",
            }}
          >
            <View style={{ marginBottom: mb }}>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>
                CHECK-IN
              </Text>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>

                {format(new Date(), "EEE, MMM d")}
              </Text>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>

                {format(new Date(), "h:mm a")}
              </Text>
            </View>
            <Svg
              viewBox="0 0 14 24"
              style={{ width: 7, height: 12 }}
            >
              <Path
                d="M3.01494 23.7656L12.1258 14.6423C12.7527 14.0125 13.1046 13.16 13.1046 12.2714C13.1046 11.3827 12.7527 10.5303 12.1258 9.90046L3.0044 0.765625L0.976562 2.79825L10.098 11.9321C10.1878 12.022 10.2383 12.1438 10.2383 12.2709C10.2383 12.398 10.1878 12.5198 10.098 12.6097L0.986146 21.733L3.01494 23.7656Z"
                fill="#876486"
              />
            </Svg>

            <View>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>
                CHECK-OUT
              </Text>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>

                {format(new Date(), "EEE, MMM d")}
              </Text>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>
  
                {format(new Date(), "h:mm a")}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
              paddingBottom: 30,
              borderBottom: "1px solid #949494",
            }}
          >
            <View style={{ marginBottom: mb }}>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>
                Who&apos;s coming
              </Text>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>
                {5} guest
              </Text>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>
                (Cobbler)
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
              paddingBottom: 30,
              borderBottom: "1px solid #949494",
            }}
          >
            <View style={{ marginBottom: mb }}>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>
                Confirmation code
              </Text>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>
                HMS8CKHKDJ
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
              paddingBottom: 30,
              borderBottom: "1px solid #949494",
            }}
          >
            <View style={{ marginBottom: mb }}>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>
                Address
              </Text>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>
                {"Dhaka"}, {"Romna"}, {"Bangladesh"} Hosted by Kornata
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
              paddingBottom: 30,
              borderBottom: "1px solid #949494",
            }}
          >
            <View style={{ marginBottom: mb }}>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>
                Hosted by Kornata
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
              paddingBottom: 30,
              borderBottom: "1px solid #949494",
            }}
          >
            <View style={{ marginBottom: mb }}>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>
                Total cost
              </Text>
              <Text style={[styles.text, { fontSize: 12, color: "#000" }]}>
                ${"USE"} USD
              </Text>
            </View>
          </View>
        </View>
      </Page> */}
      <Page size="LETTER" style={styles.page} wrap={false}>
        <View
          style={[
            styles.container,
            {
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <View
            style={[
              styles.section,
              {
                marginBottom: 30,
                paddingBottom: 30,
                paddingTop: 30,
                // borderBottom: "1px solid #949494",
              },
            ]}
          >
            <Image
              style={{
                width: 70,
                height: 70,
                marginHorizontal: "auto",
                marginBottom: 20,
              }}
              src={"/somadhan-foundation-logo.png"}
            />
            <Text
              style={[
                {
                  fontFamily: "Lato",
                  fontSize: 26,
                  color: secondary,
                  marginBottom: mb2,
                  textAlign: "center",
                  textTransform: "uppercase",
                },
              ]}
            >
              Certificate Of Membership
            </Text>
            <Text
              style={[
                {
                  fontFamily: "Lato",
                  fontSize: 14,
                  color: secondary,
                  marginBottom: mb2,
                  textAlign: "center",
                },
              ]}
            >
              This Certificate Awarded to
            </Text>
            <Text
              style={[
                {
                  fontFamily: "Lato",
                  fontSize: 22,
                  marginBottom: mb2,
                  textAlign: "center",
                  color: "#000",
                },
              ]}
            >
              {name}
            </Text>
            <Text
              style={[
                {
                  fontFamily: "Lato",
                  fontSize: 12,
                  marginBottom: mb,
                  textAlign: "center",
                  color: secondary,
                },
              ]}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate quidem nemo sequi voluptates sapiente. Distinctio in
              voluptatibus pariatur rem accusamus. At ipsum ad harum, ea
              inventore placeat. Rem nemo aliquam explicabo, soluta laudantium,
              voluptatem dolor magnam, odio saepe iure cumque id optio error
              quibusdam nam nihil obcaecati maxime possimus. Voluptatem
              perspiciatis incidunt voluptatibus at saepe dignissimos
              laudantium, magnam maxime doloremque ipsa ea natus quasi alias
              nulla nesciunt repellat expedita, eligendi qui ab. Consequuntur
              dolorem facilis, est laborum voluptatem voluptatibus minima!
              Tenetur aspernatur aut nostrum praesentium odit at hic porro
              molestiae soluta enim ab qui, ratione, ullam assumenda quisquam
              eligendi iusto.
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginBottom: 60,
              paddingBottom: 30,
            }}
          >
            <Text
              style={[
                {
                  fontFamily: "Lato",
                  fontSize: 22,
                  marginBottom: mb,
                  textAlign: "center",
                  color: "#000",
                },
              ]}
            >
              Title
            </Text>
            <Text
              style={[
                {
                  fontFamily: "Lato",
                  fontSize: 14,
                  marginBottom: mb,
                  textAlign: "center",
                  color: "#000",
                },
              ]}
            >
              Given on this 22th day of May, 2024 at company DKIDMF
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
              paddingBottom: 30,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTop: "2px solid #949494",
                paddingTop: 10,
              }}
            >
              <Text
                style={[
                  {
                    color: "#000",
                    textAlign: "center",
                    fontFamily: "Lato",
                    fontSize: 16,
                  },
                ]}
              >
                NAME
              </Text>
              <Text
                style={[
                  {
                    color: secondary,
                    textAlign: "center",
                    fontFamily: "Lato",
                    fontSize: 12,
                  },
                ]}
              >
                Title
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderTop: "2px solid #949494",
                paddingTop: 10,
              }}
            >
              <Text
                style={[
                  {
                    color: "#000",
                    textAlign: "center",
                    fontFamily: "Lato",
                    fontSize: 16,
                  },
                ]}
              >
                NAME
              </Text>
              <Text
                style={[
                  {
                    color: secondary,
                    textAlign: "center",
                    fontFamily: "Lato",
                    fontSize: 12,
                  },
                ]}
              >
                Title
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CertificatePdf;
