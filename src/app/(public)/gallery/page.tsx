import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import "./gallery.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Samadhan Group | Gallery",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF).",
};

const GalleryPage = () => {
  return (
    <section className="places_section">
      <Container>
        <div className="places_top_text text-center">
          <h2 className="text-4xl">সমাধান ফাউন্ডেশন গ্যালারি</h2>
        </div>
        <div className="image_gallery">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 md:col-span-3 rounded-lg">
              <div className="place-img before:rounded-lg place-image-1 group rounded-lg">
                <Button className="absolute text-sm rounded-lg top-4 right-4 scale-x-0 group-hover:scale-x-100 transition-all duration-500">
                  6/7/2024
                </Button>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 rounded-lg">
              <div className="place-img before:rounded-lg place-image-2 group rounded-lg">
                <Button className="absolute text-sm rounded-lg top-4 right-4 scale-x-0 group-hover:scale-x-100 transition-all duration-500">
                  2/3/2023
                </Button>
              </div>
            </div>
            <div className="col-span-12 md:col-span-3 rounded-lg">
              <div className="place-img before:rounded-lg place-image-3 group rounded-lg">
                <Button className="absolute text-sm rounded-lg top-4 right-4 scale-x-0 group-hover:scale-x-100 transition-all duration-500">
                  30/7/2022
                </Button>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 rounded-lg">
              <div className="place-img before:rounded-lg place-image-4 rounded-group rounded-lg">
                <Button className="absolute text-sm rounded-lg top-4 right-4 scale-x-0 group-hover:scale-x-100 transition-all duration-500">
                  24/3/2023
                </Button>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 rounded-lg">
              <div className="place-img before:rounded-lg place-image-5 group rounded-lg">
                <Button className="absolute text-sm rounded-lg top-4 right-4 scale-x-0 group-hover:scale-x-100 transition-all duration-500">
                  9/6/2023
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="gallery_content">
          <h3 className="text-xl mt-8 font-bold">সমাধান ফাউন্ডেশন</h3>
          <p className="text-lg mt-2">
          &quot;একটি বেসরকারী, অলাভজনক ও অরাজনৈতিক এবং সকল হিংসা, ধর্ম-বর্ণ, দলমত নির্বিশেষে একটি আদর্শ সেবা বান্ধব- সামাজিক সেবামূলক সংস্থা” একটি জবাবদিহী মূলক, শোষণ মুক্তির লক্ষে, স্বাধীনতা দিতে, মুক্তি দিতে, অধিকার নিশ্চিত করণের লক্ষে, দক্ষ কর্মী গঠনে সেমিনার এবং ওয়ার্কসপ তৈরী ও নিত্য-নতুন কর্ম সংস্থান সৃষ্টি করে- &quot;মৌলিক চাহিদার অভাব চিরতরে দূরীকরনের লক্ষে&quot;- প্রত্যেক সদস্য মন্ডলীর জীবন চলার পাথেয়- অবলম্বনে উক্ত ফাউন্ডেশন কাজ করিবে। যার ফলে, দেশে বেকারত্ব মুক্ত, দারিদ্র মুক্ত, নিরক্ষর মুক্ত, জঙ্গী/সন্ত্রাস মুক্ত, দক্ষ কর্মী ও সু-নাগরিক গড়ে উঠিবে।
          </p>

          <h3 className="text-xl mt-8 font-bold">প্রতিষ্ঠাতা চেয়ারম্যান এর বাণী</h3>
          <p className="text-lg mt-2">
            সমস্ত প্রশংসা মহান আল্লাহতালার, যিনি গোটা বিশ্বের মালিক ও অধিপতি যিনি মানব জাতিকে জ্ঞান-বিজ্ঞানে অধিষ্ঠিত করেছেন। আল্লাহ-বলেন আমি তোমাদেরকে বাহির করিয়াছি মানবকল্যাণে। দেশকে ভালবাসা মহান আল্লাহর বিধান। তাই বিশ্ব মানচিত্রে আমাদের প্রিয় মাতৃভূমি বাংলাদেশ, ছোট্ট একটি দেশ। কিন্তু বিশাল জনসংখ্যার ভারে নূজ্যমান। বিশাল এ জনসংখ্যাকে যদি সত্যিকার অর্থে মানব সম্পদে রূপান্তর করা যায় তাহলে দেশটি সত্যিই সোনার দেশ হিসেবে গড়ে উঠিবে। এই প্রত্যয় নিয়ে &quot;দেশ ও জাতির কল্যাণে মানব জাতির সেবায়&quot; &quot;সমাধান ফাউন্ডেশন&quot; এর অগ্রযাত্রা। জনকল্যান, স্বাস্থ্যসেবা, উন্নয়ন, সেবামূলক, নিরক্ষরতা দূরীকরণ, বেকারত্ব দূরীকরণ, নারীদের কর্মসংস্থান, আত্মকর্মসংস্থান সৃষ্টি, আধুনিক কৃষি উন্নয়ন, আধুনিক শিক্ষার মান উন্নয়ন, পরিবেশ উন্নয়ন, কৃষি উদ্যোক্তা সৃষ্টি, কৃষি উন্নয়নে বিনিযয়োগ, নিত্য নতুন সৃজনশীল ধারণা, মাদ্রাসা ছাত্র-ছাত্রীদের কারিগরী শিক্ষা ও কর্মসংস্থান সৃষ্টি, ইমাম-মুয়াজ্জিনগণের স্ত্রী/আহলিয়াদের নিজ গৃহে পর্দার অন্তরালে সমাজ ও দেশের উন্নয়নের স্বার্থে হস্থশিল্প/কুটির শিল্প, সেলাই, নকশী এবং উন্নয়নমূলক কর্মসংস্থানমূলক কাজ সৃষ্টি।
          </p>

          <h3 className="text-xl mt-8 font-bold">সমাধান ফাউন্ডেশনের লক্ষ্য</h3>
          <p className="text-lg mt-2">
            দেশ ও জাতির কল্যাণে যাঁরা &quot;সমাধান ফাউন্ডেশন&quot;- এর সদস্য হবেন তাদের মৌলিক চাহিদা যেমন- অন্ন, বস্ত্র, বাসস্থান, শিক্ষা ও চিকিৎসা সেবা পূরণে ফাউন্ডেশন কাজ করিবে এবং প্রত্যেক সদস্যদের স্বাধীনতা নিশ্চিতকরন, অধিকার নিশ্চিতকরন, মুক্তি নিশ্চিতকরন, শান্তি নিশ্চিতকরন। &quot;সমাধান ফাউন্ডেশন&quot;- এর যারা সদস্য হবেন দৈনন্দিন নিত্য প্রয়োজনীয় দ্রব্য সামগ্রী/মৌলিক চাহিদা সমূহ ৫০% ন্যায্যমূল্য অধিকারের ভিত্তিতে প্রতিটি ইউনিয়ন, পৌর ওয়ার্ড এবং নিজ নিজ এলাকা থেকে সদস্যগণ সদস্য ইউনিট কার্ডের মাধ্যমে উক্ত ফাউন্ডেশনের শপিং মল/সুপার শপ/সেলস সেন্টার/সদস্যদের দৌড়গড়ে/ সেবামূলক প্রতিষ্ঠান থেকে বাংলাদেশের যে কোন প্রান্ত থেকে বাজার দরের তুলনামূলক অনেক কম মূল্য ক্রয় করিতে পারিবেন। যার ফলে, গরিব সদস্যদের চাহিদা মোতাবেক পরিবারে সকল ক্ষেত্রে যোগান দেওয়া সহজ হবে। ফাউন্ডেশনের সদস্য হবেন কৃষকবৃন্দ ইমাম-মুয়াজ্জিনগণ, ক্ষুদ্র ব্যবসায়িক, কওমি মাদ্রাসা, কওমি মাদ্রাসা শিক্ষকগণ মাদ্রাসার ছাত্র এবং ছাত্রীগণ, রিকশা চালক, সিকিউরিটি গার্ড, সিএনজি, বাস, ট্রাক, অটো রিকশা, প্রাইভেটকার ইত্যাদি চালকগণ, গার্মেন্টস শ্রমিক ও যাদের বেতন ২০ (বিশ) হাজার টাকার মধ্যে এবং &quot;সমাধান ফাউন্ডেশন&quot;- এর সকল কর্মচারী কর্মকর্তাবৃন্দ। এমনিভাবে সারা বাংলাদেশে ফাউন্ডেশনের সকল কর্মকান্ড পরিচালনার জন্য প্রত্যেক বিভাগ, জেলা, উপজেলা, ইউনিয়ন এবং পৌর সিটি নিয়োগকৃত সংগঠক/অর্গ্যানাইজার দ্বারা প্রত্যেক গ্রাম, উপজেলা, জেলা, বিভাগ এমনকি সমগ্র বাংলাদেশ ফাউন্ডেশনের কার্যক্রম সুন্দর ও সাবলীলভাবে পরিচালনার জন্য নিয়ন্ত্রণকারী জনবল নিয়োগ প্রক্রিয়ায় বাস্তবায়িত হবে।
          </p>

          <h3 className="text-xl mt-8 font-bold">ভবিষ্যত পরিকল্পনা</h3>
          <p className="text-lg mt-2">
            বিশুদ্ধ পানি সরবরাহে গভীর নলকূপ, জলবয়ু উষ্ণতা রোধকরণ, নিঃস্বরণমুক্ত চিরসবুজ বেষ্টুনী গড়ে, বেকারত্ব মুক্ত, দারিদ্র্যমুক্ত, দুর্নীতিমুক্ত, সৃজনশীল স্বকর্ম উদ্যোগ যুক্ত, জ্ঞান- বিজ্ঞানের আধুনিক প্রগতির ডিজিটাল সভ্যতার বাংলাদেশ বিনির্মাণে &quot;সমাধান ফাউন্ডেশন&quot;- কাজ করিবে। বাংলাদেশের প্রতিটি ইউনিয়ন, উপজেলা, জেলা এবং বিভাগে ১০০% সোলার সিষ্টেম ইন্সটল, ১০০% রিটেইল ব্যবসা বিক্রয় শপিং সেন্টার তৈরি এবং ৫% নারী উদ্যোক্তা তৈরি।
          </p>

          <h3 className="text-xl mt-8 font-bold">স্বাগত বাণী</h3>
          <p className="text-lg mt-2">
            দেশের কৃষি ও গ্রামীণ উন্নয়ন, কর্মসংস্থান সৃষ্টির পাশাপাশি বাংলাদেশকে আর্থসামাজিকভাবে সমৃদ্ধ, উন্নত এবং আত্মনির্ভরশীল সমাজ প্রতিষ্ঠার লক্ষ্যে “সমাধান ফাউন্ডেশন” কাজ করে যাচ্ছে।
          </p>
        </div>
      </Container>
    </section>
  );
};

export default GalleryPage;
