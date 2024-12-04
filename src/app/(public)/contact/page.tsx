import ContactForm from "@/components/forms/contact-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Samadhan Foundation | Contact",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF).",
};

const ContactPage = () => {
  return (
    <div className="container min-h-screen mx-auto px-5 md:px-4">
      <section className="mt-20 md:mt-32">
        {/* <div className="flex justify-center">
          <div className="text-center md:max-w-xl lg:max-w-3xl">
            <h2 className="mb-20 px-6 text-4xl font-bold">Contact us</h2>
          </div>
        </div> */}

        <div className="flex flex-wrap">
          <ContactForm />

          <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
            {/* Contact Us Heading */}
            <div className="mb-12 pl-24">
              <h2 className="mb-4 text-3xl font-bold">Contact Us</h2>
              <p className="text-neutral-500">
                We welcome inquiries, feedback, and collaboration opportunities.
                If you&apos;d like to learn more about any of our companies or have a
                specific request, please don&apos;t hesitate to get in touch with us.
              </p>
            </div>

            {/* Head Office */}
            <div className="mb-12 pl-24">
              <h3 className="mb-3 text-2xl font-bold">Head Office</h3>
              <p className="text-neutral-500">
                119/120 Adamjee Court Annex-2, Motijheel, Dhaka 1000, Bangladesh
              </p>
              <p className="text-neutral-500">Phone: 01816959999</p>
              <p className="text-neutral-500">
                Email: Infosamadhangroupbdd@gmail.com
              </p>
            </div>

            {/* Contact Categories */}
            <div className="flex flex-wrap">
              {/* Technical Support */}
              <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <div className="inline-block rounded-md bg-gray-900-100 p-4 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-2 font-bold">Technical Support</p>
                    <p className="text-neutral-500">support@example.com</p>
                    <p className="text-neutral-500">+1 234-567-89</p>
                  </div>
                </div>
              </div>

              {/* Sales Inquiries */}
              <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <div className="inline-block rounded-md bg-gray-900-100 p-4 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-2 font-bold">Sales Questions</p>
                    <p className="text-neutral-500">sales@example.com</p>
                    <p className="text-neutral-500">+1 234-567-89</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Careers */}
            <div className="mb-12 pl-24">
              <h3 className="mb-3 text-2xl font-bold">Careers</h3>
              <p className="text-neutral-500">
                At [Your Company Name] Group, we believe our people are our
                greatest asset. We are always on the lookout for talented
                individuals who are passionate about innovation and want to
                contribute to our success. Join us in shaping the future across
                multiple industries.
              </p>
            </div>

            {/* News & Events */}
            <div className="mb-12 pl-24">
              <h3 className="mb-3 text-2xl font-bold">News & Events</h3>
              <p className="text-neutral-500">
                Stay tuned for the latest updates on our company initiatives,
                milestones, and upcoming events.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
