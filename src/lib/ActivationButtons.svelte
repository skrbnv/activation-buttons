<script lang="ts">
    import { onMount } from "svelte";
    let { type, source, code } = $props();

    let locale: string = $state("en");
    let localeDropdownVisible: boolean = $state(false);

    onMount(() => {
        console.log("browser languages", navigator.languages);
        const browserLocale = navigator.language.split("-")[0];
        if (Object.keys(availableLocales).includes(browserLocale)) {
            locale = browserLocale;
        }
    });

    const availableLocales = {
        en: {
            language: "English",
            languageEn: "English",
            dictionary: {
                "SIM Card Activation": "SIM Card Activation",
                "Select a service to manage this card:":
                    "Select a service to manage this card:",
                Telegram: "Telegram",
                VK: "VK",
                Web: "Web",
                Max: "MAX",
            },
        },
        ru: {
            language: "Русский",
            languageEn: "Russian",
            dictionary: {
                "SIM Card Activation": "Активация SIM-карты",
                "Select a service to manage this card:":
                    "Выберите сервис для управления этой картой:",
                Telegram: "Telegram",
                VK: "VK",
                Web: "Сайт",
                Max: "MAX",
            },
        },
        uz: {
            language: "O'zbekcha",
            languageEn: "Uzbek",
            dictionary: {
                "SIM Card Activation": "SIM-karta aktivatsiyasi",
                "Select a service to manage this card:":
                    "Ushbu kartani boshqarish uchun xizmatni tanlang:",
                Telegram: "Telegram",
                VK: "VK",
                Web: "Veb",
                Max: "MAX",
            },
        },
        kk: {
            language: "Қазақша",
            languageEn: "Kazakh",
            dictionary: {
                "SIM Card Activation": "SIM-картаны іске қосу",
                "Select a service to manage this card:":
                    "Бұл картаны басқару үшін қызметті таңдаңыз:",
                Telegram: "Telegram",
                VK: "VK",
                Web: "Сайт",
                Max: "MAX",
            },
        },
        de: {
            language: "Deutsch",
            languageEn: "German",
            dictionary: {
                "SIM Card Activation": "SIM-Karten-Aktivierung",
                "Select a service to manage this card:":
                    "Wählen Sie einen Dienst zur Verwaltung dieser Karte:",
                Telegram: "Telegram",
                VK: "VK",
                Web: "Web",
                Max: "MAX",
            },
        },
        es: {
            language: "Español",
            languageEn: "Spanish",
            dictionary: {
                "SIM Card Activation": "Activación de tarjeta SIM",
                "Select a service to manage this card:":
                    "Seleccione un servicio para gestionar esta tarjeta:",
                Telegram: "Telegram",
                VK: "VK",
                Web: "Web",
                Max: "MAX",
            },
        },
        fr: {
            language: "Français",
            languageEn: "French",
            dictionary: {
                "SIM Card Activation": "Activation de la carte SIM",
                "Select a service to manage this card:":
                    "Sélectionnez un service pour gérer cette carte:",
                Telegram: "Telegram",
                VK: "VK",
                Web: "Web",
                Max: "MAX",
            },
        },
        it: {
            language: "Italiano",
            languageEn: "Italian",
            dictionary: {
                "SIM Card Activation": "Attivazione carta SIM",
                "Select a service to manage this card:":
                    "Seleziona un servizio per gestire questa carta:",
                Telegram: "Telegram",
                VK: "VK",
                Web: "Web",
                Max: "MAX",
            },
        },
        ja: {
            language: "日本語",
            languageEn: "Japanese",
            dictionary: {
                "SIM Card Activation": "SIMカードの有効化",
                "Select a service to manage this card:":
                    "このカードを管理するサービスを選択してください:",
                Telegram: "Telegram",
                VK: "VK",
                Web: "ウェブサイト",
                Max: "MAX",
            },
        },
        nl: {
            language: "Nederlands",
            languageEn: "Dutch",
            dictionary: {
                "SIM Card Activation": "SIM-kaartactivering",
                "Select a service to manage this card:":
                    "Selecteer een service om deze kaart te beheren:",
                Telegram: "Telegram",
                VK: "VK",
                Web: "Web",
                Max: "MAX",
            },
        },
        pt: {
            language: "Português",
            languageEn: "Portuguese",
            dictionary: {
                "SIM Card Activation": "Ativação do cartão SIM",
                "Select a service to manage this card:":
                    "Selecione um serviço para gerir este cartão:",
                Telegram: "Telegram",
                VK: "VK",
                Web: "Site",
                Max: "MAX",
            },
        },
        tr: {
            language: "Türkçe",
            languageEn: "Turkish",
            dictionary: {
                "SIM Card Activation": "SIM kart etkinleştirme",
                "Select a service to manage this card:":
                    "Bu kartı yönetmek için bir servis seçin:",
                Telegram: "Telegram",
                VK: "VK",
                Web: "Web",
                Max: "MAX",
            },
        },
        zh: {
            language: "简体中文",
            languageEn: "Chinese (Simplified)",
            dictionary: {
                "SIM Card Activation": "SIM卡激活",
                "Select a service to manage this card:": "选择管理此卡的服务:",
                Telegram: "Telegram",
                VK: "VK",
                Web: "网页",
                Max: "MAX",
            },
        },
    };

    const dictionary = $derived(
        availableLocales[locale as keyof typeof availableLocales]?.dictionary,
    );

    function t(key: string): string {
        if (!dictionary) return key;
        if (!dictionary[key as keyof typeof dictionary]) {
            console.error(
                `Key ${key} not found in dictionary for locale ${locale}`,
            );
            return key;
        }
        return dictionary[key as keyof typeof dictionary] ?? key;
    }

    function getLanguage(locale: string) {
        return availableLocales[locale as keyof typeof availableLocales]
            ?.language;
    }
    function getLanguageEn(locale: string) {
        return availableLocales[locale as keyof typeof availableLocales]
            ?.languageEn;
    }

    function buildTelegramLink() {
        switch (type) {
            case "e":
                return `https://t.me/m8tel_bot?start=${source}-${code}`;
            case "old":
                return `https://t.me/m8tel_bot?start=${code}`;
            default:
                return `https://t.me/m8tel_bot?start=s-${code}`;
        }
    }

    function buildVKLink() {
        switch (type) {
            case "e":
                return `https://vk.com/app51912191#start=${source}-${code}-${locale}`;
            case "old":
                return `https://vk.com/app51912191#start=${code}-${locale}`;
            default:
                return `https://vk.com/app51912191#start=s-${code}-${locale}`;
        }
    }

    function buildWebLink() {
        switch (type) {
            case "e":
                return `https://web.m8.tel?ref=${source}-${code}-${locale}`;
            case "old":
                return `https://web.m8.tel?ref=${code}-${locale}`;
            default:
                return `https://web.m8.tel?ref=s-${code}-${locale}`;
        }
    }

    function buildMaxLink() {
        switch (type) {
            case "e":
                return `https://max.m8.tel?start=${source}-${code}`;
            case "old":
                return `https://max.m8.tel?start=${code}`;
            default:
                return `https://max.m8.tel?start=s-${code}`;
        }
    }

    function buildOldLink() {
        return `https://ru.m8.tel?ref=${code}`;
    }
</script>

{#snippet Flag(country: string, size: number)}
    <img
        width={size}
        height={size}
        src="/images/flags_circle/language/{country}.svg"
        alt={country}
        class="flag default"
    />
{/snippet}

{#snippet LogoHorizontal(color: string, size: number, ratio: "large" | "small")}
    <svg
        x="0px"
        y="0px"
        width={size}
        height={size / 2.621}
        viewBox="0 0 253.2 96.6"
        style="enable-background:new 0 0 253.2 96.6;"
    >
        <path
            style="fill: #09B6FD"
            d="M52.5,4.2C25.9,4.2,4.3,25.9,4.3,52.6c0,16.6,8.4,31.3,21.2,40c2.7-9.7,10.4-17.3,20.1-19.9
        c-8.9-3-15.2-11.4-15.2-21.4c0-12.5,10.1-22.6,22.5-22.6s22.5,10.1,22.5,22.6c0,9.9-6.4,18.3-15.2,21.4c9.6,2.5,17.2,10,20,19.4
        c12.4-8.7,20.6-23.2,20.6-39.6C100.8,25.9,79.2,4.2,52.5,4.2"
        />

        {#if ratio === "large"}
            <path
                fill={color}
                d="M120.1,79.6V17.3c0-0.3,0.3-0.6,0.6-0.6h18.1c0.2,0,0.5,0.1,0.6,0.4L155,55.6L170.3,17c0.1-0.2,0.3-0.4,0.6-0.4
            h18.4c0.3,0,0.6,0.3,0.6,0.6v62.3c0,0.3-0.3,0.6-0.6,0.6h-14c-0.3,0-0.6-0.3-0.6-0.6V38.4L160,75.1c-0.1,0.2-0.3,0.4-0.6,0.4h-9.2
            c-0.2,0-0.5-0.2-0.6-0.4L135,38.5v41.1c0,0.3-0.3,0.6-0.6,0.6c-2.4,0-11.4,0-13.8,0C120.3,80.2,120.1,79.9,120.1,79.6z"
            />
            <g>
                <path
                    fill={color}
                    d="M220.6,81.7c-5.2,0-10-0.6-14-2.3c-4.1-1.6-7.1-3.6-9.5-6.4c-2.3-2.8-3.5-6.2-3.5-9.7c0-2.7,0.4-5.4,1.8-7.7
                c1.3-2.2,3.4-4.4,5.7-5.9c3.9-2.6,9.1-3.1,9.1-3.1c-3.7-0.7-8.2-2.1-10.5-4.8c-2.4-2.7-3.6-5.8-3.6-9.4c0-3.4,1.1-6.4,3.2-9
                c2.1-2.6,5-4.7,8.8-6.2c3.7-1.5,7.9-2.3,12.6-2.3c4.7,0,9,0.8,12.7,2.3s6.6,3.6,8.8,6.3c2.1,2.6,3.2,5.6,3.2,9
                c0,3.6-1.1,6.8-3.6,9.4c-2.9,2.9-6.6,4-10.3,4.7c0,0,5.3,0.5,9.1,3.1c3,2.1,4,3.6,5.3,5.9c1.3,2.2,1.9,5,1.9,7.7
                c0,3.5-1.1,6.7-3.5,9.5c-2.3,2.8-5.4,5-9.4,6.6C230.7,81,225.9,81.7,220.6,81.7z M220.6,70.3c2,0,3.8-0.4,5.4-1.1
                c1.5-0.7,2.7-1.8,3.6-3.1c0.9-1.3,1.3-2.8,1.3-4.5s-0.4-3.2-1.3-4.5c-0.9-1.3-2.1-2.3-3.6-3.1s-3.3-1.2-5.3-1.2s-3.7,0.4-5.2,1.1
                c-1.5,0.8-2.7,1.8-3.6,3.1c-0.9,1.3-1.3,2.8-1.3,4.5s0.4,3.2,1.3,4.5c0.9,1.3,2.1,2.3,3.6,3.1C216.8,70,218.6,70.3,220.6,70.3z
                 M220.5,41.7c1.7,0,3.2-0.3,4.5-1s2.3-1.6,3.1-2.8s1.1-2.6,1.1-4.1c0-1.6-0.4-2.9-1.1-4.1c-0.7-1.2-1.8-2.1-3.1-2.7
                c-1.3-0.7-2.8-1-4.5-1s-3.1,0.3-4.4,1c-1.3,0.7-2.3,1.6-3.1,2.7c-0.7,1.2-1.1,2.5-1.1,4.1c0,1.5,0.4,2.9,1.1,4.1
                c0.7,1.2,1.7,2.1,3.1,2.8C217.4,41.4,218.9,41.7,220.5,41.7z"
                />
            </g>
        {:else}
            <path
                fill={color}
                d="M119.8,75.8V21.1c0-0.3,0.3-0.5,0.5-0.5h15.9c0.2,0,0.4,0.1,0.5,0.4l13.7,33.8l13.4-33.9
        c0.1-0.2,0.3-0.4,0.5-0.4h16.2c0.3,0,0.5,0.3,0.5,0.5v54.7c0,0.3-0.3,0.5-0.5,0.5h-12.3c-0.3,0-0.5-0.3-0.5-0.5V39.6l-12.9,32.2
        c-0.1,0.2-0.3,0.4-0.5,0.4h-8.1c-0.2,0-0.4-0.2-0.5-0.4l-12.8-32.1v36.1c0,0.3-0.3,0.5-0.5,0.5c-2.1,0-10,0-12.1,0
        C120,76.3,119.8,76,119.8,75.8z"
            />
            <g>
                <path
                    fill={color}
                    d="M208,77.6c-4.6,0-8.8-0.5-12.3-2c-3.6-1.4-6.2-3.2-8.3-5.6c-2-2.5-3.1-5.4-3.1-8.5c0-2.4,0.4-4.7,1.6-6.8
            c1.1-1.9,3-3.9,5-5.2c3.4-2.3,8-2.7,8-2.7c-3.2-0.6-7.2-1.8-9.2-4.2c-2.1-2.4-3.2-5.1-3.2-8.3c0-3,1-5.6,2.8-7.9
            c1.8-2.3,4.4-4.1,7.7-5.4c3.2-1.3,6.9-2,11.1-2c4.1,0,7.9,0.7,11.1,2s5.8,3.2,7.7,5.5c1.8,2.3,2.8,4.9,2.8,7.9c0,3.2-1,6-3.2,8.3
            c-2.5,2.5-5.8,3.5-9,4.1c0,0,4.7,0.4,8,2.7c2.6,1.8,3.5,3.2,4.7,5.2c1.1,1.9,1.7,4.4,1.7,6.8c0,3.1-1,5.9-3.1,8.3
            c-2,2.5-4.7,4.4-8.3,5.8C216.9,77,212.7,77.6,208,77.6z M208,67.6c1.8,0,3.3-0.4,4.7-1c1.3-0.6,2.4-1.6,3.2-2.7
            c0.8-1.1,1.1-2.5,1.1-4c0-1.5-0.4-2.8-1.1-4c-0.8-1.1-1.8-2-3.2-2.7s-2.9-1.1-4.7-1.1c-1.8,0-3.2,0.4-4.6,1
            c-1.3,0.7-2.4,1.6-3.2,2.7c-0.8,1.1-1.1,2.5-1.1,4c0,1.5,0.4,2.8,1.1,4c0.8,1.1,1.8,2,3.2,2.7C204.7,67.3,206.2,67.6,208,67.6z
             M207.9,42.5c1.5,0,2.8-0.3,4-0.9c1.1-0.6,2-1.4,2.7-2.5c0.7-1.1,1-2.3,1-3.6c0-1.4-0.4-2.5-1-3.6c-0.6-1.1-1.6-1.8-2.7-2.4
            c-1.1-0.6-2.5-0.9-4-0.9s-2.7,0.3-3.9,0.9c-1.1,0.6-2,1.4-2.7,2.4c-0.6,1.1-1,2.2-1,3.6c0,1.3,0.4,2.5,1,3.6
            c0.6,1.1,1.5,1.8,2.7,2.5C205.2,42.2,206.5,42.5,207.9,42.5z"
                />
            </g>
        {/if}
    </svg>
{/snippet}

{#snippet Header()}
    <div class="header">
        <h3>{t("SIM Card Activation")}</h3>
        <p>{t("Select a service to manage this card:")}</p>
    </div>
{/snippet}

{#snippet Buttons()}
    <div class="buttons">
        <a class="button" href={buildTelegramLink()}>
            <svg
                width={24}
                height={24}
                x="0px"
                y="0px"
                viewBox="0 0 40 40"
                style="enable-background:new 0 0 40 40;"
                xml:space="preserve"
            >
                <path
                    fill="#FFFFFF"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.1,18.2c9.3-4.1,15.5-6.7,18.7-8.1c8.9-3.7,10.7-4.3,11.9-4.4c0.3,0,0.9,0.1,1.3,0.4c0.3,0.3,0.4,0.6,0.5,0.9
	c0.1,0.3,0.1,0.8,0.1,1.3c-0.5,5.1-2.6,17.4-3.6,23c-0.5,2.4-1.3,3.2-2.2,3.3c-1.9,0.2-3.3-1.2-5.1-2.4c-2.8-1.8-4.4-3-7.1-4.8
	c-3.2-2.1-1.1-3.2,0.7-5.1c0.5-0.5,8.7-7.9,8.8-8.6c0-0.1,0-0.4-0.2-0.6c-0.2-0.2-0.5-0.1-0.7-0.1c-0.3,0.1-4.8,3-13.5,8.9
	c-1.3,0.9-2.4,1.3-3.5,1.3c-1.1,0-3.3-0.6-5-1.2c-2-0.6-3.6-1-3.5-2.1C2.8,19.4,3.6,18.9,5.1,18.2z"
                />
            </svg>
            Telegram
        </a>
        <a class="button" href={buildVKLink()}>
            <svg
                width={24}
                height={24}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="9 9 32 32"
                style="enable-background:new 0 0 48 48;"
                xml:space="preserve"
            >
                <path
                    fill="#ffffff"
                    d="M25.5,34.3c-10.7,0-16.8-7.3-17.1-19.6h5.4c0.2,9,4.1,12.8,7.3,13.6V14.7h5.1v7.7c3.1-0.3,6.3-3.9,7.4-7.7h5.1
	c-0.8,4.8-4.4,8.3-6.9,9.8c2.5,1.2,6.5,4.2,8,9.8h-5.6c-1.2-3.7-4.2-6.6-8.1-7v7H25.5z"
                />
            </svg>
            VK
        </a>
        <a class="button" href={buildWebLink()}>
            <svg
                width={24}
                height={24}
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#FFFFFF"
                    d="M5.8,5.9C5.3,3.7,5.8,3,7.8,3.9s22.8,10.5,25.1,11.6c1.8,0.8,1.5,2.2,0.1,2.8c-1.4,0.7-5.6,2.6-6.3,3
	s-1.2,0.7-0.7,1.3s3.9,4.9,4.9,6.1c0.9,1.2,0.9,2.2-0.2,3.2c-1.2,1-2.1,1.7-2.9,2.3c-1.1,0.9-1.6,0.4-3-1.3
	c-1.4-1.7-4.6-5.6-5.5-6.5s-1.1-0.5-1.8,0.9S15,32,14.5,32.9c-0.4,0.8-1,1.1-1.4-0.2C12.7,31.4,5.8,5.9,5.8,5.9z"
                />
            </svg>
            Web
        </a>
        <a class="button" href={buildMaxLink()}>
            <svg
                width={24}
                height={24}
                x="0px"
                y="0px"
                viewBox="0 0 16 16"
                style="enable-background:new 0 0 40 40;"
                xml:space="preserve"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#FFFFFF"
                    d="M8.1,14c-1.2,0-1.7-0.2-2.7-0.9c-0.6,0.8-2.5,1.4-2.6,0.3
c0-0.8-0.2-1.4-0.4-2.2C2.2,10.4,2,9.4,2,8c0-3.4,2.8-6,6.1-6C11.4,2,14,4.7,14,8C14,11.3,11.4,13.9,8.1,14 M8.2,5
C6.6,4.9,5.3,6,5,7.7C4.8,9.2,5.2,11,5.5,11.1c0.2,0,0.6-0.3,0.8-0.6C6.8,10.8,7.3,11,7.9,11c1.7,0.1,3.1-1.2,3.2-2.9
C11.1,6.5,9.9,5.1,8.2,5L8.2,5z"
                />
            </svg>
            Max
        </a>
        {#if type === "old"}
            <a class="button" href={buildOldLink()}>
                Use old activation login
            </a>
        {/if}
    </div>
{/snippet}

{#snippet LocaleSelector()}
    <button
        class="locale-item bordered"
        onclick={() => (localeDropdownVisible = !localeDropdownVisible)}
    >
        <div class="flag-container-locale">
            {@render Flag(locale, 36)}
        </div>
        <div class="name-container">
            <div class="native-name">
                {getLanguage(locale)}
            </div>
            {#if locale !== "en"}
                <div class="english-name">
                    {getLanguageEn(locale)}
                </div>
            {/if}
        </div>
        <div class="arrow {localeDropdownVisible ? 'up' : 'down'}"></div>
    </button>
    {#if localeDropdownVisible}
        <div class="backdrop"></div>
        <div class="locale-selector">
            <div class="locales-list">
                {#each Object.entries(availableLocales) as [localeCode, localeData]}
                    <button
                        class="locale-item"
                        onclick={() => {
                            locale = localeCode;
                            localeDropdownVisible = false;
                        }}
                    >
                        <div class="flag-container-locale">
                            {@render Flag(localeCode, 18)}
                        </div>
                        <div class="name-container">
                            <div class="native-name">
                                {localeData.language}
                            </div>
                            {#if localeCode !== "en"}
                                <div class="english-name">
                                    {localeData.languageEn}
                                </div>
                            {/if}
                        </div>
                    </button>
                {/each}
            </div>
        </div>
    {/if}
{/snippet}

<div class="activation-buttons">
    {@render LogoHorizontal("var(--color-text-primary)", 130, "small")}
    {@render Header()}
    {@render Buttons()}
    {@render LocaleSelector()}
</div>

<style>
    .activation-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        gap: 20px;
        width: 300px;
        padding: 40px 40px 40px 40px;
        border-radius: 10px;
        background: var(--color-background-secondary);
        box-sizing: border-box;
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
    }

    /* Header */
    .header {
        h3 {
            margin-top: 0;
            margin-bottom: 0;
            text-align: center;
        }
        p {
            margin-top: 0px;
            margin-bottom: 10px;
            font-size: 14px;
            text-align: center;
        }
    }

    /* Buttons */
    .buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: 10px;
        color: var(--color-text-primary);
        .button {
            background-color: transparent;
            border: 1px solid var(--color-accent);
            background-color: var(--color-accent);
            color: #ffffff;
            font-size: 14px;
            line-height: 1.65;
            text-decoration: none;
            font-weight: 500;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            gap: 4px;
            width: 100%;
        }
    }

    /* Locale selector */
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        z-index: 2;
        pointer-events: none;
    }

    .locale-selector {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
        z-index: 3;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        background: var(--color-background-secondary);
        border-radius: 10px;
        padding: 40px 10px;
        border: 1px solid rgba(128, 128, 128, 0.2);
        box-sizing: border-box;
        .locales-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            justify-content: center;
            gap: 10px;
            box-sizing: border-box;
        }
    }

    .locale-item {
        display: grid;
        grid-template-columns: 26px 1fr;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 150px;
        padding: 5px 0;
        margin: 0;
        border: none;
        background: none;
        color: var(--color-text-primary);
        column-gap: 5px;
        position: relative;
        &.bordered {
            border: 1px solid rgba(128, 128, 128, 0.2);
            grid-template-columns: 40px 1fr;
            padding: 10px;
            padding-right: 30px;
            max-width: 190px;
        }
        .arrow {
            width: 0px;
            height: 0px;
            border-style: solid;
            border-width: 6px 6px 0 6px;
            border-color: var(--color-text-secondary) transparent transparent
                transparent;
            transform: rotate(0deg);
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            &.up {
                transform: rotate(180deg);
            }
        }
        .flag-container-locale {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        & .native-name {
            line-height: 1.2;
            opacity: 1;
            font-size: 16px;
            text-align: left;
        }
        & .english-name {
            line-height: 1;
            font-size: 12px;
            opacity: 0.6;
            text-align: left;
        }
    }
</style>
