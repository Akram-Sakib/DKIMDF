"use client";
import CertificatePdf from "@/components/pdf/certificate";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";

const PDF = () => {
  return (
    <PDFViewer className="h-screen w-full">
      <CertificatePdf name="Akram Hossain" />
    </PDFViewer>
  );
};

export default PDF;
