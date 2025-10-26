export type Language = "en" | "ml";

export const translations = {
  en: {
    // Header
    signIn: "Sign in",
    subscribe: "Subscribe",
    
    // Common
    readMore: "Read More",
    latestIn: "Latest in",
    
    // Homepage
    topNews: "Top News",
    breakingNews: "Breaking News",
    breakingNewsDesc: "Breaking stories and essential updates from India and the world.",
    leadPhoto: "Lead photo",
    
    // Sections
    news: "News",
    kerala: "Kerala",
    india: "India",
    business: "Business",
    sport: "Sport",
    technology: "Technology",
    health: "Health",
    science: "Science",
    culture: "Culture",
    entertainment: "Entertainment",
    subscriberOnly: "Subscriber Only",
    
    // Loading
    loading: "Loading",
    loadingContent: "Loading content...",
    
    // Error
    errorTitle: "Something went wrong",
    errorDescription: "We're sorry, but something unexpected happened. Please try again.",
    tryAgain: "Try Again",
    goHome: "Go to Homepage",
    
    // 404
    notFoundTitle: "Page Not Found",
    notFoundDescription: "Sorry, we couldn't find the page you're looking for.",
    
    // Footer
    footerAbout: "About Us",
    footerContact: "Contact",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerCopyright: "© 2025 The World News. All rights reserved.",
    
    // Article
    minuteRead: "min read",
    
    // No content
    noContentAvailable: "Live headlines could not be loaded at the moment. Please try again soon.",
  },
  ml: {
    // Header
    signIn: "സൈൻ ഇൻ",
    subscribe: "സബ്‌സ്‌ക്രൈബ്",
    
    // Common
    readMore: "കൂടുതൽ വായിക്കുക",
    latestIn: "ഏറ്റവും പുതിയത്",
    
    // Homepage
    topNews: "പ്രധാന വാർത്തകൾ",
    breakingNews: "ബ്രേക്കിംഗ് ന്യൂസ്",
    breakingNewsDesc: "ഇന്ത്യയിൽ നിന്നും ലോകത്തിൽ നിന്നുമുള്ള പ്രധാന വാർത്തകളും അപ്‌ഡേറ്റുകളും.",
    leadPhoto: "പ്രധാന ഫോട്ടോ",
    
    // Sections
    news: "വാർത്തകൾ",
    kerala: "കേരളം",
    india: "ഇന്ത്യ",
    business: "ബിസിനസ്",
    sport: "സ്പോർട്സ്",
    technology: "ടെക്‌നോളജി",
    health: "ആരോഗ്യം",
    science: "സയൻസ്",
    culture: "സംസ്കാരം",
    entertainment: "വിനോദം",
    subscriberOnly: "സബ്‌സ്‌ക്രൈബർമാർക്ക് മാത്രം",
    
    // Loading
    loading: "ലോഡ് ചെയ്യുന്നു",
    loadingContent: "ഉള്ളടക്കം ലോഡ് ചെയ്യുന്നു...",
    
    // Error
    errorTitle: "എന്തോ കുഴപ്പം സംഭവിച്ചു",
    errorDescription: "ക്ഷമിക്കണം, അപ്രതീക്ഷിതമായ എന്തോ സംഭവിച്ചു. വീണ്ടും ശ്രമിക്കുക.",
    tryAgain: "വീണ്ടും ശ്രമിക്കുക",
    goHome: "ഹോം പേജിലേക്ക് പോകുക",
    
    // 404
    notFoundTitle: "പേജ് കണ്ടെത്തിയില്ല",
    notFoundDescription: "ക്ഷമിക്കണം, നിങ്ങൾ തിരയുന്ന പേജ് കണ്ടെത്താനായില്ല.",
    
    // Footer
    footerAbout: "ഞങ്ങളെക്കുറിച്ച്",
    footerContact: "ബന്ധപ്പെടുക",
    footerPrivacy: "സ്വകാര്യതാ നയം",
    footerTerms: "സേവന നിബന്ധനകൾ",
    footerCopyright: "© 2025 ദി വേൾഡ് ന്യൂസ്. എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം.",
    
    // Article
    minuteRead: "മിനിറ്റ് വായന",
    
    // No content
    noContentAvailable: "ഇപ്പോൾ വാർത്തകൾ ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല. കുറച്ച് കഴിഞ്ഞ് വീണ്ടും ശ്രമിക്കുക.",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getTranslation(lang: Language, key: TranslationKey): string {
  return translations[lang][key];
}
