
// This is a simplified and incomplete list for demonstration purposes.
// A real application would use a comprehensive API or database.
export const regions = [
  {
    "region_name": "National Capital Region (NCR)",
    "region_code": "130000000",
    "province_list": [
        {
            "province_name": "Metro Manila",
            "province_code": "133900000",
            "city_list": [
                { "city_name": "Manila", "city_code": "133901000" },
                { "city_name": "Quezon City", "city_code": "133905000" },
                { "city_name": "Makati", "city_code": "133902000" },
            ]
        }
    ],
  },
  {
    "region_name": "Central Visayas (Region VII)",
    "region_code": "070000000",
    "province_list": [
        {
            "province_name": "Cebu",
            "province_code": "072200000",
            "city_list": [
                { "city_name": "Cebu City", "city_code": "072217000" },
                { "city_name": "Mandaue City", "city_code": "072230000" },
                { "city_name": "Lapu-Lapu City", "city_code": "072226000" },
            ]
        },
        {
            "province_name": "Bohol",
            "province_code": "071200000",
            "city_list": [
                { "city_name": "Tagbilaran City", "city_code": "071242000" },
            ]
        }
    ],
  }
];
