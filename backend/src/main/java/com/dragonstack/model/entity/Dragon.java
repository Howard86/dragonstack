package com.dragonstack.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Set;

//TODO: Probably don't need Lombok constructor annotation
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Dragon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDateTime birthdate = LocalDateTime.now();

    @NotNull
    private String nickname = "A New Happy Dragon";

    private boolean isPublic = false;
    private int sireValue = 0;
    private int saleValue = 0;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "dragon_trait",
            joinColumns = {
                    @JoinColumn(name = "dragon_id", referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "trait_id", referencedColumnName = "id")
            }
    )
    @OrderBy(value = "id ASC")
    private Set<Trait> traits;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "generation_id")
    private Generation generation;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;
}
