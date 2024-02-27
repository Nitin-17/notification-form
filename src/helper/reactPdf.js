import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { renderToStaticMarkup } from "react-dom/server";
import { Html } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    margin: 30,
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
  },
});

// Pre-defined HTML string
const htmlString =
  "<div><h1>This is the content</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div>";

const PDFDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text>This is the header</Text>
      </View>

      {/* Content */}
      <Text>{htmlString}</Text>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>This is the footer</Text>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
