<?php
/**
 * Plugin Name: SU Rudmanns Custom Post Types
 * Description: Custom Post Types for SU Rudmanns Website
 */

function surudmanns_register_post_types() {
    register_post_type("player", [
        "labels" => ["name" => "Players", "singular_name" => "Player"],
        "public" => true,
        "show_in_rest" => true,
        "rest_base" => "players",
        "show_in_graphql" => true,
        "graphql_single_name" => "player",
        "graphql_plural_name" => "players",
        "supports" => ["title", "thumbnail", "custom-fields"],
        "menu_icon" => "dashicons-groups"
    ]);
    
    register_post_type("game", [
        "labels" => ["name" => "Games", "singular_name" => "Game"],
        "public" => true,
        "show_in_rest" => true,
        "rest_base" => "games",
        "show_in_graphql" => true,
        "graphql_single_name" => "game",
        "graphql_plural_name" => "games",
        "supports" => ["title", "custom-fields"],
        "menu_icon" => "dashicons-sports"
    ]);
    
    register_post_type("news", [
        "labels" => ["name" => "News", "singular_name" => "News"],
        "public" => true,
        "show_in_rest" => true,
        "rest_base" => "news",
        "show_in_graphql" => true,
        "graphql_single_name" => "newsItem",
        "graphql_plural_name" => "news",
        "supports" => ["title", "editor", "thumbnail", "custom-fields"],
        "menu_icon" => "dashicons-admin-post"
    ]);
    
    register_post_type("event", [
        "labels" => ["name" => "Events", "singular_name" => "Event"],
        "public" => true,
        "show_in_rest" => true,
        "rest_base" => "events",
        "show_in_graphql" => true,
        "graphql_single_name" => "event",
        "graphql_plural_name" => "events",
        "supports" => ["title", "editor", "thumbnail", "custom-fields"],
        "menu_icon" => "dashicons-calendar"
    ]);
    
    register_post_type("sponsor", [
        "labels" => ["name" => "Sponsors", "singular_name" => "Sponsor"],
        "public" => true,
        "show_in_rest" => true,
        "rest_base" => "sponsors",
        "show_in_graphql" => true,
        "graphql_single_name" => "sponsor",
        "graphql_plural_name" => "sponsors",
        "supports" => ["title", "thumbnail", "custom-fields"],
        "menu_icon" => "dashicons-money-alt"
    ]);
    
    register_post_type("team_member", [
        "labels" => ["name" => "Team Members", "singular_name" => "Team Member"],
        "public" => true,
        "show_in_rest" => true,
        "rest_base" => "team_members",
        "show_in_graphql" => true,
        "graphql_single_name" => "teamMember",
        "graphql_plural_name" => "teamMembers",
        "supports" => ["title", "thumbnail", "custom-fields"],
        "menu_icon" => "dashicons-businessman"
    ]);
}
add_action("init", "surudmanns_register_post_types");
