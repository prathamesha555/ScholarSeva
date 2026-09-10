export type Opportunity = {
  id: number;
  title: string;
  type: "Scholarship" | "Government Scheme";
  description: string;
  eligibility: string;
  benefit: string;
  deadline: string;
  state: string;
  education: string;
  officialUrl: string;
};

export const opportunities: Opportunity[] = [
  {
    id: 1,
    title: "National Scholarship",
    type: "Scholarship",
    description:
      "Financial assistance for eligible students pursuing their education.",
    eligibility: "Eligible students meeting the official scholarship criteria.",
    benefit: "Financial assistance",
    deadline: "30 September 2026",
    state: "All India",
    education: "Undergraduate",
    officialUrl: "https://scholarships.gov.in/",
  },

  {
    id: 2,
    title: "State Student Scholarship",
    type: "Scholarship",
    description:
      "Scholarship support for students who meet the required conditions.",
    eligibility: "Students satisfying the applicable state eligibility rules.",
    benefit: "Educational financial support",
    deadline: "15 October 2026",
    state: "Maharashtra",
    education: "Undergraduate",
    officialUrl: "https://mahadbt.maharashtra.gov.in/",
  },

  {
    id: 3,
    title: "Merit Scholarship",
    type: "Scholarship",
    description:
      "Support for students who meet the required academic criteria.",
    eligibility: "Students meeting the applicable merit requirements.",
    benefit: "Merit-based financial assistance",
    deadline: "20 October 2026",
    state: "All India",
    education: "Postgraduate",
    officialUrl: "https://scholarships.gov.in/",
  },

  {
    id: 4,
    title: "Student Support Scheme",
    type: "Government Scheme",
    description:
      "Government support designed for eligible students and families.",
    eligibility: "Eligibility depends on the official scheme guidelines.",
    benefit: "Government assistance",
    deadline: "Check official website",
    state: "All India",
    education: "All",
    officialUrl: "https://www.india.gov.in/",
  },

  {
    id: 5,
    title: "Education Assistance Scheme",
    type: "Government Scheme",
    description:
      "Government assistance related to education and student support.",
    eligibility: "Eligible applicants according to official rules.",
    benefit: "Education assistance",
    deadline: "Check official website",
    state: "All India",
    education: "Undergraduate",
    officialUrl: "https://www.india.gov.in/",
  },

  {
    id: 6,
    title: "Youth Development Scheme",
    type: "Government Scheme",
    description:
      "Support and development opportunities for eligible young people.",
    eligibility: "Eligibility depends on the official scheme requirements.",
    benefit: "Development support",
    deadline: "Check official website",
    state: "All India",
    education: "All",
    officialUrl: "https://www.india.gov.in/",
  },
];