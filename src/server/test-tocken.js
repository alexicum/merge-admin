var request = require("request");

var options = { method: 'GET',
  url: 'http://localhost:3000/siteProducts',
  headers: { authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJEVkROVUUwTTBFelJFRTVNVU01TXpOR01qTXdNVEZFUVRZNU5rVTJOMFJHUWpBNU5rTXlOdyJ9.eyJpc3MiOiJodHRwczovL2FsZXhpY3VtLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJEZ3lXR1Y1SmFaMGJ0eTAybUU1WDRkNkZiRzRZNE8wMUBjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWF0IjoxNTMyNDIwNDc3LCJleHAiOjE1MzI1MDY4NzcsImF6cCI6IkRneVdHVjVKYVowYnR5MDJtRTVYNGQ2RmJHNFk0TzAxIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.tCnPr1owxCRa_TmpWh2GtmMDyPjAcMa8PzzxApoj9YKx9m838YRL9iVsf11xnlzCOcLSA27fjf186SCgWLUBZk5WD9DC1nMhCOjkVUK4g76UPQkmuO6p5k-8anUL0ekEOTLd0xbdGw0zb5_aNS0P3tUJGZRtujE9VGvDDeax_zH76aYZvzu3TfYBid949GIhF17TBhNf7yELxbEIXF34bDFQEi-6gK4fQwiaTzaeZX1mkUEtSd5cJsPQgQLKnMZeZ-23z-9tkiIMZ5uk7Ls1ur24TBxEcus8xXQHjQ1Ed2mj0mH-ACikl-wgLUClnJvUVSRmRJMuupYF950XWBVX7A' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});