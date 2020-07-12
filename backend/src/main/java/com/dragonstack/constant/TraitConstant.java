package com.dragonstack.constant;

import com.dragonstack.model.entity.Trait;

//    TODO: refactor constant
public class TraitConstant {

    public final static String[] TRAIT_TYPES = {"backgroundColor", "patten", "build", "size"};

    public final static Trait[] TRAITS = {
            new Trait("backgroundColor", "black"),
            new Trait("backgroundColor", "white"),
            new Trait("backgroundColor", "green"),
            new Trait("backgroundColor", "blue"),
            new Trait("build", "slender"),
            new Trait("build", "stocky"),
            new Trait("build", "sporty"),
            new Trait("build", "skinny"),
            new Trait("size", "small"),
            new Trait("size", "medium"),
            new Trait("size", "large"),
            new Trait("size", "enormous"),
            new Trait("patten", "plain"),
            new Trait("patten", "striped"),
            new Trait("patten", "spotted"),
            new Trait("patten", "patchy"),
    };

//    TODO: find other data structure to process default Traits
//    public final static Trait[] PATTEN_TRAITS = {
//            new Trait("patten", "plain"),
//            new Trait("patten", "striped"),
//            new Trait("patten", "spotted"),
//            new Trait("patten", "patchy"),
//    };
//
//    public final static Trait[] BUILD_TRAITS = {
//            new Trait("build", "slender"),
//            new Trait("build", "stocky"),
//            new Trait("build", "sporty"),
//            new Trait("build", "skinny"),
//    };
//
//    public final static Trait[] SIZE_TRAITS = {
//            new Trait("size", "small"),
//            new Trait("size", "medium"),
//            new Trait("size", "large"),
//            new Trait("size", "enormous"),
//    };
//
//    public final static Trait[] BACKGROUND_COLOR_TRAITS = {
//            new Trait("backgroundColor", "black"),
//            new Trait("backgroundColor", "white"),
//            new Trait("backgroundColor", "green"),
//            new Trait("backgroundColor", "blue"),
//    };
}
