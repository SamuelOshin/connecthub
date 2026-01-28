export const PRIVACY_CONTENT = {
  intro: "At ConnectHub, we believe your privacy is a fundamental right. This Privacy Policy explains how we collect, use, and protect your personal information when you use our dating app and services. We've designed our platform to give you control over what you share and who you connect with.",
  sections: [
    {
      id: "data-we-collect",
      title: "1. Data We Collect",
      icon: "database",
      content: "We collect information you provide directly to us, such as when you create or modify your account, request customer support, or otherwise communicate with us. This includes:",
      subsections: [
        {
          title: "Account Info",
          icon: "badge",
          items: ["Name and birthdate", "Email address", "Phone number", "Profile photos"]
        },
        {
          title: "Usage Data",
          icon: "timeline",
          items: ["Precise location", "Device information", "In-app messages", "Interaction history"]
        }
      ],
      summary: "We need basic info like your name and photos to build your profile, and location data to show you nearby matches. We never sell your personal data to third parties."
    },
    {
      id: "how-we-use",
      title: "2. How We Use Your Data",
      icon: "bar_chart",
      content: "Our main goal is to help you find meaningful connections. We use your information to:",
      list: [
        "Personalize your experience by suggesting potential matches based on your preferences and location.",
        "Improve our algorithms to provide more accurate connection recommendations over time.",
        "Ensure the safety and security of our community through automated and manual profile verification."
      ]
    },
    {
        id: "sharing",
        title: "3. Sharing Information",
        icon: "share",
        content: "We do not sell your personal data. We only share information with third parties when necessary to provide our services (e.g., payment processing) or when required by law."
    },
    {
        id: "cookies",
        title: "4. Cookies & Tracking",
        icon: "cookie",
        content: "We use cookies and similar technologies to remember your preferences and understand how you use our app."
    },
    {
      id: "rights",
      title: "5. Your Privacy Rights",
      icon: "shield_person",
      content: "Regardless of where you live, we provide the same high standard of privacy rights to all our users. You have the right to:",
      cards: [
        { title: "Access & Update", icon: "edit_note", desc: "Request a copy of your data or update any inaccurate information directly in the app." },
        { title: "Right to Erasure", icon: "delete_forever", desc: "Delete your account and all associated personal data at any time from your settings." },
        { title: "Object to Processing", icon: "do_not_disturb_on", desc: "Limit how we use your data for specific purposes like marketing or analytics." },
        { title: "Data Portability", icon: "download_for_offline", desc: "Request your personal information in a machine-readable format to move it elsewhere." }
      ]
    },
    {
        id: "security",
        title: "6. Data Security",
        icon: "lock",
        content: "We implement robust security measures to protect your data from unauthorized access, alteration, or destruction."
    }
  ]
};
