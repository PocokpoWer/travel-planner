package org.example.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class FlySearchingService {

    private final RestTemplate restTemplate;
    private final String apiKey;
    private static final String BASE_URL = "https://api.travelpayouts.com";

    public FlySearchingService(
            RestTemplateBuilder restTemplateBuilder,
            @Value("${travelpayouts.api.key}") String apiToken
    ) {
        this.restTemplate = restTemplateBuilder.build();
        this.apiKey = apiToken;
    }

    //this is searching for flights
    public String searchFlights(String origin, String destination, String departDate, String returnDate, String currency) {
        String url = UriComponentsBuilder
                .fromHttpUrl(BASE_URL + "/aviasales/v3/prices_for_dates")
                .queryParam("origin", origin.toUpperCase())
                .queryParam("destination", destination.toUpperCase())
                .queryParam("departure_at", departDate)
                .queryParamIfPresent(
                        "return_at",
                        (returnDate != null && !returnDate.isBlank())
                                ? java.util.Optional.of(returnDate)
                                : java.util.Optional.empty()
                )
                .queryParam("sorting", "price")
                .queryParam("direct", false)
                .queryParam("unique", false)
                .queryParam("currency", currency != null ? currency.toUpperCase() : "EUR")
                .queryParam("market", "us")
                .queryParam("limit", 30)
                .queryParam("page", 1)
                .queryParam("one_way", returnDate == null || returnDate.isBlank())
                .queryParam("token", apiKey)
                .toUriString();

        return restTemplate.getForObject(url, String.class);
    }

    //Not yet connected to the front-end
    public String getLocationCode(String cityName) {
        String url = UriComponentsBuilder
                .fromHttpUrl("https://autocomplete.travelpayouts.com/places2")
                .queryParam("term", cityName)
                .queryParam("locale", "en")
                .queryParam("types[]", "city")
                .queryParam("types[]", "airport")
                .toUriString();

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        return response.getBody();
    }
}