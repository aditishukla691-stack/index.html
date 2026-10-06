/**
 * Google Ads Automation Script
 * This script sets up a Lead Generation Search Campaign with 4 Ad Groups,
 * 20+ Keywords, and optimized Ad Copy.
 * 
 * Instructions:
 * 1. Log in to ads.google.com
 * 2. Go to Tools & Settings -> Scripts
 * 3. Click + (New Script)
 * 4. Paste this code and click 'Run'
 */

function main() {
  const CAMPAIGN_NAME = "Lead Gen - Digital Marketing Services";
  const DAILY_BUDGET = 1000;
  const LOCATION_NAME = "India";
  const FINAL_URL = "https://aditishukla.in/"; // Replace with your domain if different

  // 1. Create the Campaign (Note: Standard scripts might need to use a builder or check if exists)
  // For simplicity, we assume the campaign is created or we provide instructions to create a shell.
  // Google Ads Scripts are better at managing existing structures.
  
  Logger.log("Starting Campaign Setup for: " + CAMPAIGN_NAME);

  const adGroupsData = [
    {
      name: "[AG1] Digital Marketing Services",
      keywords: [
        { text: "digital marketing services india", matchType: "EXACT" },
        { text: "best digital marketing agency", matchType: "PHRASE" },
        { text: "digital marketing for small business", matchType: "PHRASE" },
        { text: "digital marketing consultant india", matchType: "PHRASE" },
        { text: "affordable digital marketing services", matchType: "PHRASE" }
      ]
    },
    {
      name: "[AG2] SEO Specialist",
      keywords: [
        { text: "hire seo specialist", matchType: "EXACT" },
        { text: "best seo services india", matchType: "PHRASE" },
        { text: "seo consultant for business", matchType: "PHRASE" },
        { text: "seo expert for hire", matchType: "EXACT" },
        { text: "local seo services india", matchType: "PHRASE" },
        { text: "seo agency for small business", matchType: "PHRASE" }
      ]
    },
    {
      name: "[AG3] Google Ads Expert",
      keywords: [
        { text: "google ads management services", matchType: "EXACT" },
        { text: "hire google ads expert", matchType: "PHRASE" },
        { text: "ppc management india", matchType: "PHRASE" },
        { text: "google ads specialist", matchType: "EXACT" },
        { text: "search engine marketing services", matchType: "PHRASE" },
        { text: "ppc expert india", matchType: "PHRASE" }
      ]
    },
    {
      name: "[AG4] Hire Digital Marketer",
      keywords: [
        { text: "hire freelance digital marketer", matchType: "EXACT" },
        { text: "digital marketing freelancer india", matchType: "PHRASE" },
        { text: "hire remote digital marketer", matchType: "PHRASE" },
        { text: "freelance ppc specialist india", matchType: "PHRASE" },
        { text: "hire social media marketer freelance", matchType: "PHRASE" }
      ]
    }
  ];

  const headlines = [
    "Expert Digital Marketer India",
    "Grow Your Business Online",
    "Get More High-Quality Leads",
    "Hire Aditi Shukla - SEO Expert",
    "Results-Driven Google Ads",
    "Data-Driven Marketing Strategy",
    "Increase Your ROI Today"
  ];

  const descriptions = [
    "Professional Digital Marketing services to help your business grow and find new customers.",
    "Specialist in SEO, Google Ads, and Meta Ads. Let's build your online presence together.",
    "Get a free consultation for your digital marketing strategy. 100% data-driven results."
  ];

  const negativeKeywords = [
    "Free", "Internship", "Job", "Course", "Meaning", "Definition",
    "Tutorial", "Salary", "What is", "Books", "PDF", "Cheap",
    "Login", "Portal", "Wikipedia"
  ];

  // Logic to iterate and create (Simplified for the user to understand)
  // In a real script, you'd use AdsApp.newCampaignBuilder() etc.
  
  Logger.log("Please ensure a Search Campaign named '" + CAMPAIGN_NAME + "' exists before running.");
  
  var campaignIterator = AdsApp.campaigns()
      .withCondition("Name = '" + CAMPAIGN_NAME + "'")
      .get();

  if (campaignIterator.hasNext()) {
    var campaign = campaignIterator.next();
    
    // Set Budget
    campaign.getBudget().setAmount(DAILY_BUDGET);
    
    adGroupsData.forEach(function(ag) {
      var adGroupOperation = campaign.newAdGroupBuilder()
          .withName(ag.name)
          .withStatus("ENABLED")
          .build();
      
      if (adGroupOperation.isSuccessful()) {
        var adGroup = adGroupOperation.getResult();
        Logger.log("Created Ad Group: " + ag.name);
        
        // Add Keywords
        ag.keywords.forEach(function(kw) {
          adGroup.newKeywordBuilder()
              .withText(kw.text)
              .withCpc(10) // Starting bid
              .build();
          Logger.log("  Added Keyword: " + kw.text);
        });
        
        // Add Responsive Search Ad
        var adBuilder = adGroup.newAd().responsiveSearchAdBuilder();
        headlines.forEach(function(h) { adBuilder.addHeadline(h); });
        descriptions.forEach(function(d) { adBuilder.addDescription(d); });
        adBuilder.withFinalUrl(FINAL_URL).build();
        Logger.log("  Created Responsive Search Ad");
      }
    });

    // Add Negative Keywords
    negativeKeywords.forEach(function(neg) {
      campaign.createNegativeKeyword(neg);
    });
    Logger.log("Added 15+ Negative Keywords");

  } else {
    Logger.log("ERROR: Campaign '" + CAMPAIGN_NAME + "' not found. Create it manually first.");
  }
}
