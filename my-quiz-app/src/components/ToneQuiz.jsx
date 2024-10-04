import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Text,
  Progress,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";

const ToneQuiz = ({ onComplete }) => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wordMeaning, setWordMeaning] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(10); // 10-second timer
  const [isActive, setIsActive] = useState(true); // Track if timer is active
  const inputRef = useRef(null); // Ref for the radio group

  const quizData = [
    {
      word: "Sublime",
      tone: "Positive",
      meaning:
        "Of such excellence or beauty that it inspires great admiration or awe.",
    },
    {
      word: "Benevolent",
      tone: "Positive",
      meaning: "Well-meaning and kindly; showing goodwill.",
    },
    {
      word: "Utopian",
      tone: "Positive",
      meaning: "Idealistic or aiming for a perfect society.",
    },
    {
      word: "Transcendent",
      tone: "Positive",
      meaning: "Going beyond ordinary limits; surpassing; exceeding.",
    },
    {
      word: "Cognizant",
      tone: "Positive",
      meaning: "Having knowledge or being aware of.",
    },
    {
      word: "Ebullient",
      tone: "Positive",
      meaning: "Cheerful and full of energy; enthusiastic.",
    },
    {
      word: "Exuberant",
      tone: "Positive",
      meaning: "Filled with lively energy and excitement.",
    },
    {
      word: "Venerable",
      tone: "Positive",
      meaning:
        "Accorded a great deal of respect, especially due to age, wisdom, or character.",
    },
    {
      word: "Rejuvenating",
      tone: "Positive",
      meaning: "Making someone feel or look young or youthful; revitalizing.",
    },
    {
      word: "Empowering",
      tone: "Positive",
      meaning:
        "Giving someone the authority or power to do something; enabling.",
    },
    {
      word: "Altruistic",
      tone: "Positive",
      meaning: "Showing a selfless concern for the well-being of others.",
    },
    {
      word: "Affable",
      tone: "Positive",
      meaning: "Friendly, good-natured, and easy to talk to.",
    },
    {
      word: "Amicable",
      tone: "Positive",
      meaning: "Characterized by friendliness and absence of discord.",
    },
    {
      word: "Beneficent",
      tone: "Positive",
      meaning: "Generous or doing good.",
    },
    {
      word: "Bounteous",
      tone: "Positive",
      meaning: "Generously given or giving; bountiful.",
    },
    {
      word: "Candid",
      tone: "Positive",
      meaning: "Truthful and straightforward; frank.",
    },
    {
      word: "Cordial",
      tone: "Positive",
      meaning: "Warm and friendly; heartfelt.",
    },
    {
      word: "Diligent",
      tone: "Positive",
      meaning: "Having or showing care in one's work or duties.",
    },
    {
      word: "Eloquent",
      tone: "Positive",
      meaning: "Fluent or persuasive in speaking or writing.",
    },
    {
      word: "Exemplary",
      tone: "Positive",
      meaning:
        "Serving as a desirable model; representing the best of its kind.",
    },
    {
      word: "Felicity",
      tone: "Positive",
      meaning:
        "Intense happiness; the ability to find appropriate expression for one's thoughts.",
    },
    {
      word: "Fortuitous",
      tone: "Positive",
      meaning: "Happening by accident or chance rather than design.",
    },
    {
      word: "Galvanizing",
      tone: "Positive",
      meaning: "Shock or excite someone into taking action.",
    },
    {
      word: "Gregarious",
      tone: "Positive",
      meaning: "Fond of company; sociable.",
    },
    {
      word: "Harmonious",
      tone: "Positive",
      meaning: "Forming a pleasing or consistent whole.",
    },
    {
      word: "Immaculate",
      tone: "Positive",
      meaning: "Perfectly clean, neat, or tidy.",
    },
    {
      word: "Infallible",
      tone: "Positive",
      meaning: "Incapable of making mistakes or being wrong.",
    },
    {
      word: "Innovative",
      tone: "Positive",
      meaning: "Featuring new methods; advanced and original.",
    },
    {
      word: "Inspired",
      tone: "Positive",
      meaning: "Filled with the urge or ability to do something creative.",
    },
    { word: "Intrepid", tone: "Positive", meaning: "Fearless; adventurous." },
    { word: "Joyous", tone: "Positive", meaning: "Full of happiness and joy." },
    {
      word: "Luminous",
      tone: "Positive",
      meaning: "Bright or shining, especially in the dark.",
    },
    {
      word: "Magnanimous",
      tone: "Positive",
      meaning:
        "Very generous or forgiving, especially toward a rival or less powerful person.",
    },
    {
      word: "Nurturing",
      tone: "Positive",
      meaning: "Providing care and encouragement.",
    },
    {
      word: "Opulent",
      tone: "Positive",
      meaning: "Ostentatiously rich and luxurious or lavish.",
    },
    {
      word: "Paradisiacal",
      tone: "Positive",
      meaning: "Heavenly; resembling paradise.",
    },
    {
      word: "Phenomenal",
      tone: "Positive",
      meaning: "Very remarkable; extraordinary.",
    },
    {
      word: "Pristine",
      tone: "Positive",
      meaning: "In its original condition; unspoiled.",
    },
    {
      word: "Proficient",
      tone: "Positive",
      meaning: "Competent or skilled in doing or using something.",
    },
    {
      word: "Radiant",
      tone: "Positive",
      meaning: "Sending out light; shining or glowing brightly.",
    },
    {
      word: "Resplendent",
      tone: "Positive",
      meaning:
        "Attractive and impressive through being richly colorful or sumptuous.",
    },
    {
      word: "Sanguine",
      tone: "Positive",
      meaning:
        "Optimistic or positive, especially in an apparently bad or difficult situation.",
    },
    {
      word: "Serendipitous",
      tone: "Positive",
      meaning:
        "Occurring or discovered by chance in a happy or beneficial way.",
    },
    {
      word: "Sublime",
      tone: "Positive",
      meaning:
        "Of such excellence, grandeur, or beauty as to inspire great admiration or awe.",
    },
    {
      word: "Tranquil",
      tone: "Positive",
      meaning: "Free from disturbance; calm.",
    },
    {
      word: "Uplifting",
      tone: "Positive",
      meaning: "Raising one's spirits; inspiring.",
    },
    {
      word: "Valiant",
      tone: "Positive",
      meaning: "Possessing or showing courage or determination.",
    },
    {
      word: "Victorious",
      tone: "Positive",
      meaning: "Having won a victory; triumphant.",
    },
    {
      word: "Vivacious",
      tone: "Positive",
      meaning: "Attractively lively and animated.",
    },
    {
      word: "Zealous",
      tone: "Positive",
      meaning: "Having or showing zeal; passionate.",
    },
    {
      word: "Unassailable",
      tone: "Positive",
      meaning: "Unable to be attacked, questioned, or defeated.",
    },
    {
      word: "Elysian",
      tone: "Positive",
      meaning: "Divinely inspired; beautiful or creative; divinely connected.",
    },
    {
      word: "Benevolence",
      tone: "Positive",
      meaning: "The quality of being well-meaning; kindness.",
    },
    {
      word: "Ethereal",
      tone: "Positive",
      meaning:
        "Extremely delicate and light in a way that seems too perfect for this world.",
    },
    {
      word: "Propitious",
      tone: "Positive",
      meaning: "Giving or indicating a good chance of success; favorable.",
    },
    {
      word: "Ascendant",
      tone: "Positive",
      meaning: "In a position of dominance; rising.",
    },
    {
      word: "Cognizance",
      tone: "Positive",
      meaning: "Awareness, knowledge, or notice.",
    },
    {
      word: "Profound",
      tone: "Positive",
      meaning: "Having deep insight or understanding.",
    },
    {
      word: "Resilient",
      tone: "Positive",
      meaning:
        "Able to withstand or recover quickly from difficult conditions.",
    },
    {
      word: "Proactive",
      tone: "Positive",
      meaning:
        "Creating or controlling a situation rather than just responding to it.",
    },
    {
      word: "Noble",
      tone: "Positive",
      meaning:
        "Having or showing fine personal qualities or high moral principles.",
    },
    {
      word: "Elation",
      tone: "Positive",
      meaning: "Great happiness and exhilaration.",
    },
    {
      word: "Sociable",
      tone: "Positive",
      meaning: "Willing to talk and engage in activities with others.",
    },
    {
      word: "Inspiring",
      tone: "Positive",
      meaning: "Having the effect of inspiring someone.",
    },
    {
      word: "Virtuous",
      tone: "Positive",
      meaning: "Having or showing high moral standards.",
    },
    {
      word: "Aspiration",
      tone: "Positive",
      meaning: "A hope or ambition of achieving something.",
    },
    {
      word: "Impeccable",
      tone: "Positive",
      meaning: "In accordance with the highest standards; faultless.",
    },
    {
      word: "Magnificent",
      tone: "Positive",
      meaning: "Extremely beautiful, elaborate, or impressive.",
    },
    {
      word: "Resounding",
      tone: "Positive",
      meaning: "Making an echoing sound; unmistakable or emphatic.",
    },
    {
      word: "Synergy",
      tone: "Positive",
      meaning:
        "The interaction of elements that when combined produce a total effect that is greater than the sum of the individual elements.",
    },
    {
      word: "Transformative",
      tone: "Positive",
      meaning: "Causing a marked change in someone or something.",
    },
    {
      word: "Dazzling",
      tone: "Positive",
      meaning: "Extremely impressive, beautiful, or skillful.",
    },
    {
      word: "Lustrous",
      tone: "Positive",
      meaning: "Shiny and radiant; having luster.",
    },
    {
      word: "Cherubic",
      tone: "Positive",
      meaning: "Having a sweet, innocent appearance; angelic.",
    },
    {
      word: "Charismatic",
      tone: "Positive",
      meaning:
        "Exercising a compelling charm that inspires devotion in others.",
    },
    { word: "Bubbling", tone: "Positive", meaning: "Full of cheerful energy." },
    {
      word: "Intuitive",
      tone: "Positive",
      meaning: "Having the ability to understand something instinctively.",
    },
    {
      word: "Progressive",
      tone: "Positive",
      meaning: "Open to or favoring new ideas, policies, or methods.",
    },
    {
      word: "Zenith",
      tone: "Positive",
      meaning: "The highest point; the peak.",
    },
    {
      word: "Galactic",
      tone: "Positive",
      meaning: "Relating to a galaxy; vast and impressive.",
    },
    {
      word: "Wholesome",
      tone: "Positive",
      meaning: "Conducive to health or moral well-being.",
    },
    {
      word: "Nefarious",
      tone: "Negative",
      meaning: "Wicked or criminal; villainous.",
    },
    {
      word: "Ominous",
      tone: "Negative",
      meaning:
        "Giving the impression that something bad or unpleasant is going to happen.",
    },
    {
      word: "Pernicious",
      tone: "Negative",
      meaning:
        "Having a harmful effect, especially in a gradual or subtle way.",
    },
    {
      word: "Melancholy",
      tone: "Negative",
      meaning: "A deep, persistent sadness or gloom.",
    },
    {
      word: "Deleterious",
      tone: "Negative",
      meaning: "Causing harm or damage.",
    },
    {
      word: "Malevolent",
      tone: "Negative",
      meaning: "Having or showing a wish to do evil to others.",
    },
    {
      word: "Cacophony",
      tone: "Negative",
      meaning: "A harsh, discordant mixture of sounds.",
    },
    {
      word: "Disparate",
      tone: "Negative",
      meaning: "Essentially different in kind; not allowing comparison.",
    },
    { word: "Dismal", tone: "Negative", meaning: "Depressing; dreary." },
    {
      word: "Pessimistic",
      tone: "Negative",
      meaning: "Tending to see the worst aspect of things; hopeless.",
    },
    {
      word: "Obnoxious",
      tone: "Negative",
      meaning: "Extremely unpleasant; disgusting.",
    },
    {
      word: "Apprehensive",
      tone: "Negative",
      meaning: "Anxious or fearful that something bad will happen.",
    },
    { word: "Hostile", tone: "Negative", meaning: "Unfriendly; antagonistic." },
    { word: "Sullen", tone: "Negative", meaning: "Bad-tempered and sulky." },
    {
      word: "Tenebrous",
      tone: "Negative",
      meaning: "Dark, shadowy, or obscure.",
    },
    {
      word: "Quarrelsome",
      tone: "Negative",
      meaning: "Given to or characterized by a ready disposition to fight.",
    },
    {
      word: "Vexatious",
      tone: "Negative",
      meaning: "Causing annoyance, frustration, or worry.",
    },
    {
      word: "Despondent",
      tone: "Negative",
      meaning: "In low spirits from loss of hope or courage.",
    },
    {
      word: "Turbulent",
      tone: "Negative",
      meaning: "Characterized by conflict, disorder, or confusion.",
    },
    {
      word: "Fractious",
      tone: "Negative",
      meaning: "Irritable and quarrelsome.",
    },
    {
      word: "Torment",
      tone: "Negative",
      meaning: "Severe physical or mental suffering.",
    },
    {
      word: "Tumultuous",
      tone: "Negative",
      meaning: "Making a loud, confused noise; uproarious.",
    },
    { word: "Morose", tone: "Negative", meaning: "Sullen and ill-tempered." },
    {
      word: "Disconsolate",
      tone: "Negative",
      meaning: "Without comfort; unhappy.",
    },
    { word: "Dour", tone: "Negative", meaning: "Stern or gloomy." },
    {
      word: "Chagrin",
      tone: "Negative",
      meaning: "Distress or embarrassment at having failed or been humiliated.",
    },
    {
      word: "Disparaging",
      tone: "Negative",
      meaning: "Regard or represent as being of little worth.",
    },
    {
      word: "Irascible",
      tone: "Negative",
      meaning: "Having or showing a tendency to be easily angered.",
    },
    { word: "Perilous", tone: "Negative", meaning: "Full of danger or risk." },
    {
      word: "Repugnant",
      tone: "Negative",
      meaning: "Extremely distasteful; unacceptable.",
    },
    {
      word: "Dissonance",
      tone: "Negative",
      meaning:
        "Lack of harmony among musical notes; tension or clash resulting from the combination of two disharmonious elements.",
    },
    { word: "Animosity", tone: "Negative", meaning: "Strong hostility." },
    {
      word: "Frustration",
      tone: "Negative",
      meaning:
        "The feeling of being upset or annoyed as a result of being unable to change or achieve something.",
    },
    {
      word: "Malice",
      tone: "Negative",
      meaning: "The intention or desire to do evil.",
    },
    {
      word: "Irreparable",
      tone: "Negative",
      meaning: "Not able to be repaired, rectified, or remedied.",
    },
    {
      word: "Noxious",
      tone: "Negative",
      meaning: "Harmful, poisonous, or very unpleasant.",
    },
    {
      word: "Squalid",
      tone: "Negative",
      meaning: "Extremely dirty and unpleasant.",
    },
    {
      word: "Lament",
      tone: "Negative",
      meaning: "A passionate expression of grief or sorrow.",
    },
    {
      word: "Despairing",
      tone: "Negative",
      meaning: "Feeling or showing the loss of all hope.",
    },
    {
      word: "Wretched",
      tone: "Negative",
      meaning: "In a very unhappy or unfortunate state.",
    },
    {
      word: "Dread",
      tone: "Negative",
      meaning: "Anticipate with great apprehension or fear.",
    },
    {
      word: "Insidious",
      tone: "Negative",
      meaning: "Proceeding in a gradual, subtle way, but with harmful effects.",
    },
    {
      word: "Stagnant",
      tone: "Negative",
      meaning: "Not flowing or running; inactive.",
    },
    { word: "Grievous", tone: "Negative", meaning: "Very severe or serious." },
    {
      word: "Reprehensible",
      tone: "Negative",
      meaning: "Deserving condemnation or punishment.",
    },
    {
      word: "Disdainful",
      tone: "Negative",
      meaning: "Showing contempt or lack of respect.",
    },
    {
      word: "Trepidation",
      tone: "Negative",
      meaning:
        "A feeling of fear or agitation about something that may happen.",
    },
    {
      word: "Debilitating",
      tone: "Negative",
      meaning: "Making someone very weak and infirm.",
    },
    {
      word: "Acrimonious",
      tone: "Negative",
      meaning: "Angry and bitter in speech or tone.",
    },
    { word: "Grim", tone: "Negative", meaning: "Forbidding or uninviting." },
    {
      word: "Awkward",
      tone: "Negative",
      meaning: "Causing or feeling embarrassment or inconvenience.",
    },
    {
      word: "Narcissistic",
      tone: "Negative",
      meaning:
        "Having an excessive interest in oneself and one's physical appearance.",
    },
    {
      word: "Desolate",
      tone: "Negative",
      meaning:
        "Deserted of people and in a state of bleak and dismal emptiness.",
    },
    { word: "Disparity", tone: "Negative", meaning: "A great difference." },
    {
      word: "Bewildering",
      tone: "Negative",
      meaning: "Causing confusion or perplexity.",
    },
    {
      word: "Repulsive",
      tone: "Negative",
      meaning: "Causing intense disgust.",
    },
    {
      word: "Regrettable",
      tone: "Negative",
      meaning: "Deserving regret; undesirable.",
    },
    {
      word: "Reckless",
      tone: "Negative",
      meaning:
        "Without thinking or caring about the consequences of an action.",
    },
    {
      word: "Disheartened",
      tone: "Negative",
      meaning: "Having lost determination or confidence.",
    },
    {
      word: "Estranged",
      tone: "Negative",
      meaning: "No longer close or affectionate to someone; alienated.",
    },
    {
      word: "Unsightly",
      tone: "Negative",
      meaning: "Unpleasant to look at; unattractive.",
    },
    {
      word: "Exasperating",
      tone: "Negative",
      meaning: "Intensely irritating and frustrating.",
    },
    {
      word: "Petulant",
      tone: "Negative",
      meaning: "Childishly sulky or bad-tempered.",
    },
    {
      word: "Subpar",
      tone: "Negative",
      meaning: "Below the usual or expected standard.",
    },
    {
      word: "Destructive",
      tone: "Negative",
      meaning: "Causing great and irreversible damage.",
    },
    {
      word: "Vulnerable",
      tone: "Negative",
      meaning: "Susceptible to physical or emotional harm.",
    },
    {
      word: "Inadequate",
      tone: "Negative",
      meaning: "Not sufficient; lacking.",
    },
    {
      word: "Isolation",
      tone: "Negative",
      meaning: "The state of being separated from others.",
    },
    {
      word: "Unstable",
      tone: "Negative",
      meaning: "Prone to change, fail, or give way; not stable.",
    },
    {
      word: "Insecurity",
      tone: "Negative",
      meaning: "Lack of confidence or assurance.",
    },
    {
      word: "Defunct",
      tone: "Negative",
      meaning: "No longer existing or functioning.",
    },
    {
      word: "Reclusive",
      tone: "Negative",
      meaning: "Avoiding the company of other people; solitary.",
    },
    {
      word: "Vicious",
      tone: "Negative",
      meaning: "Deliberately cruel or violent.",
    },
    {
      word: "Exclusionary",
      tone: "Negative",
      meaning: "Tending to exclude; not allowing others to participate.",
    },
    {
      word: "Stigmatized",
      tone: "Negative",
      meaning: "Labelled as worthy of disgrace or disapproval.",
    },
    {
      word: "Subdued",
      tone: "Negative",
      meaning: "Quiet and rather reflective or depressed.",
    },
    {
      word: "Disillusioned",
      tone: "Negative",
      meaning:
        "Disappointed in someone or something that one discovers to be less good than one had believed.",
    },
    {
      word: "Invasive",
      tone: "Negative",
      meaning: "Tending to intrude on a person's thoughts or privacy.",
    },
    {
      word: "Catastrophic",
      tone: "Negative",
      meaning: "Involving or causing sudden great damage or suffering.",
    },
    {
      word: "Unscrupulous",
      tone: "Negative",
      meaning: "Having or showing no moral principles.",
    },
    {
      word: "Obsolete",
      tone: "Negative",
      meaning: "No longer produced or used; out of date.",
    },
    {
      word: "Disruptive",
      tone: "Negative",
      meaning: "Causing or tending to cause disruption.",
    },
    {
      word: "Lethargic",
      tone: "Negative",
      meaning: "Affected by lethargy; sluggish and apathetic.",
    },
    {
      word: "Appalling",
      tone: "Negative",
      meaning: "Causing shock or dismay; horrific.",
    },
    {
      word: "Dismay",
      tone: "Negative",
      meaning: "Concern and distress caused by something unexpected.",
    },
    {
      word: "Chilling",
      tone: "Negative",
      meaning: "Causing great fear or apprehension.",
    },
    {
      word: "Calamitous",
      tone: "Negative",
      meaning: "Involving calamity; disastrous.",
    },
    {
      word: "Dreadful",
      tone: "Negative",
      meaning: "Extremely bad or serious.",
    },
    {
      word: "Repentant",
      tone: "Negative",
      meaning: "Expressing or feeling regret.",
    },
    {
      word: "Detrimental",
      tone: "Negative",
      meaning: "Tending to cause harm.",
    },
    {
      word: "Disturbing",
      tone: "Negative",
      meaning: "Causing anxiety or worry.",
    },
    {
      word: "Reticent",
      tone: "Negative",
      meaning: "Not revealing one's thoughts or feelings readily.",
    },
    { word: "Hapless", tone: "Negative", meaning: "Unfortunate or unlucky." },
    {
      word: "Malignant",
      tone: "Negative",
      meaning: "Malevolent; very virulent or infectious.",
    },
    {
      word: "Discontent",
      tone: "Negative",
      meaning: "Dissatisfaction with one's circumstances.",
    },
    {
      word: "Oppressive",
      tone: "Negative",
      meaning: "Unjustly inflicting hardship and constraint.",
    },
    {
      word: "Disgraceful",
      tone: "Negative",
      meaning: "Shockingly unacceptable.",
    },
    {
      word: "Ambiguous",
      tone: "Neutral",
      meaning:
        "Open to more than one interpretation; not having one obvious meaning.",
    },
    {
      word: "Candid",
      tone: "Neutral",
      meaning: "Truthful and straightforward; frank.",
    },
    {
      word: "Equanimous",
      tone: "Neutral",
      meaning: "Calm and composed, especially in difficult situations.",
    },
    {
      word: "Facade",
      tone: "Neutral",
      meaning: "A superficial appearance or illusion of something.",
    },
    {
      word: "Impartial",
      tone: "Neutral",
      meaning: "Treating all rivals or disputants equally; fair and just.",
    },
    {
      word: "Juxtaposition",
      tone: "Neutral",
      meaning: "The act of placing things side by side for comparison.",
    },
    {
      word: "Meticulous",
      tone: "Neutral",
      meaning: "Showing great attention to detail; very careful and precise.",
    },
    {
      word: "Nuanced",
      tone: "Neutral",
      meaning: "Characterized by subtle differences; not black and white.",
    },
    {
      word: "Quizzical",
      tone: "Neutral",
      meaning: "Expressing doubt or puzzlement; questioning.",
    },
    {
      word: "Retrospective",
      tone: "Neutral",
      meaning: "Looking back on or dealing with past events.",
    },
    {
      word: "Skeptical",
      tone: "Neutral",
      meaning: "Not easily convinced; having doubts.",
    },
    {
      word: "Subjective",
      tone: "Neutral",
      meaning:
        "Based on or influenced by personal feelings, tastes, or opinions.",
    },
    {
      word: "Tangible",
      tone: "Neutral",
      meaning: "Perceptible by touch; clear and definite.",
    },
    {
      word: "Transient",
      tone: "Neutral",
      meaning: "Lasting only for a short time; temporary.",
    },
    {
      word: "Unbiased",
      tone: "Neutral",
      meaning: "Showing no prejudice for or against something; impartial.",
    },
    {
      word: "Vicarious",
      tone: "Neutral",
      meaning:
        "Experienced in the imagination through the feelings or actions of another person.",
    },
    {
      word: "Zenith",
      tone: "Neutral",
      meaning: "The time at which something is most powerful or successful.",
    },
    {
      word: "Whimsical",
      tone: "Neutral",
      meaning:
        "Playfully quaint or fanciful, especially in an appealing and amusing way.",
    },
    {
      word: "Innocuous",
      tone: "Neutral",
      meaning: "Not harmful or offensive.",
    },
    {
      word: "Rationale",
      tone: "Neutral",
      meaning:
        "A set of reasons or a logical basis for a course of action or belief.",
    },
    {
      word: "Contemplative",
      tone: "Neutral",
      meaning: "Expressing or involving prolonged thought.",
    },
    {
      word: "Divergent",
      tone: "Neutral",
      meaning: "Tending to be different or develop in different directions.",
    },
    {
      word: "Elusive",
      tone: "Neutral",
      meaning: "Difficult to find, catch, or achieve.",
    },
    {
      word: "Fundamental",
      tone: "Neutral",
      meaning: "Forming a necessary base or core; of central importance.",
    },
    {
      word: "Imminent",
      tone: "Neutral",
      meaning: "About to happen; forthcoming.",
    },
    {
      word: "Metaphorical",
      tone: "Neutral",
      meaning: "Characterized by the use of metaphor.",
    },
    {
      word: "Objective",
      tone: "Neutral",
      meaning:
        "Not influenced by personal feelings or opinions; considering only facts.",
    },
    {
      word: "Perplexing",
      tone: "Neutral",
      meaning: "Causing confusion or bewilderment.",
    },
    {
      word: "Quintessential",
      tone: "Neutral",
      meaning:
        "Representing the most perfect or typical example of a quality or class.",
    },
    {
      word: "Reflective",
      tone: "Neutral",
      meaning: "Relating to or characterized by deep thought; thoughtful.",
    },
    {
      word: "Stagnant",
      tone: "Neutral",
      meaning: "Not flowing or moving; inactive.",
    },
    {
      word: "Tentative",
      tone: "Neutral",
      meaning: "Not certain or fixed; provisional.",
    },
    {
      word: "Uncertain",
      tone: "Neutral",
      meaning: "Not able to be relied on; not known or definite.",
    },
    {
      word: "Vague",
      tone: "Neutral",
      meaning: "Not clearly expressed or defined; lacking detail.",
    },
    {
      word: "Ambivalence",
      tone: "Neutral",
      meaning:
        "The state of having mixed feelings or contradictory ideas about something.",
    },
    {
      word: "Conundrum",
      tone: "Neutral",
      meaning: "A confusing and difficult problem or question.",
    },
    {
      word: "Dichotomy",
      tone: "Neutral",
      meaning:
        "A division or contrast between two things that are represented as being opposed or entirely different.",
    },
    {
      word: "Ethereal",
      tone: "Neutral",
      meaning: "Extremely delicate and light; too perfect for this world.",
    },
    {
      word: "Fortuitous",
      tone: "Neutral",
      meaning: "Happening by accident or chance rather than design.",
    },
    {
      word: "Holistic",
      tone: "Neutral",
      meaning:
        "Characterized by the belief that the parts of something are interconnected and can only be understood in relation to the whole.",
    },
    {
      word: "Inherent",
      tone: "Neutral",
      meaning:
        "Existing in something as a permanent, essential, or characteristic attribute.",
    },
    {
      word: "Judicious",
      tone: "Neutral",
      meaning: "Having, showing, or done with good judgment or sense.",
    },
    {
      word: "Kaleidoscopic",
      tone: "Neutral",
      meaning:
        "Having complex patterns of colors and shapes; continually changing.",
    },
    {
      word: "Labyrinthine",
      tone: "Neutral",
      meaning: "Like a labyrinth; irregular and twisting.",
    },
    {
      word: "Mundane",
      tone: "Neutral",
      meaning: "Lacking interest or excitement; dull.",
    },
    {
      word: "Nonchalant",
      tone: "Neutral",
      meaning:
        "Feeling or appearing casually calm and relaxed; not displaying anxiety.",
    },
    {
      word: "Obscure",
      tone: "Neutral",
      meaning: "Not discovered or known about; uncertain.",
    },
    {
      word: "Paradoxical",
      tone: "Neutral",
      meaning: "Seemingly absurd or self-contradictory.",
    },
    {
      word: "Quaint",
      tone: "Neutral",
      meaning: "Attractively unusual or old-fashioned.",
    },
    {
      word: "Redundant",
      tone: "Neutral",
      meaning: "Not or no longer needed or useful; superfluous.",
    },
    {
      word: "Soporific",
      tone: "Neutral",
      meaning: "Tending to induce drowsiness or sleep.",
    },
    {
      word: "Trivial",
      tone: "Neutral",
      meaning: "Of little value or importance.",
    },
    {
      word: "Ubiquitous",
      tone: "Neutral",
      meaning: "Present, appearing, or found everywhere.",
    },
    {
      word: "Vehement",
      tone: "Neutral",
      meaning: "Showing strong feeling; forceful, passionate, or intense.",
    },
    {
      word: "Whimsical",
      tone: "Neutral",
      meaning:
        "Playfully quaint or fanciful, especially in an appealing and amusing way.",
    },
    {
      word: "Xenophobic",
      tone: "Neutral",
      meaning:
        "Having or showing a dislike of or prejudice against people from other countries.",
    },
    {
      word: "Yielding",
      tone: "Neutral",
      meaning: "Giving way under pressure; not hard or rigid.",
    },
    {
      word: "Zealous",
      tone: "Neutral",
      meaning: "Having or showing zeal; enthusiastic.",
    },
    {
      word: "Adventitious",
      tone: "Neutral",
      meaning:
        "Happening or carried on according to chance rather than design or inherent nature.",
    },
    {
      word: "Burlesque",
      tone: "Neutral",
      meaning: "An absurd or comically exaggerated imitation of something.",
    },
    {
      word: "Cacophony",
      tone: "Neutral",
      meaning: "A harsh discordant mixture of sounds.",
    },
    {
      word: "Dispassionate",
      tone: "Neutral",
      meaning:
        "Not influenced by strong emotion, and so able to be rational and impartial.",
    },
    {
      word: "Eloquent",
      tone: "Neutral",
      meaning: "Fluent or persuasive in speaking or writing.",
    },
    {
      word: "Facilitate",
      tone: "Neutral",
      meaning: "Make (an action or process) easy or easier.",
    },
    {
      word: "Grandiose",
      tone: "Neutral",
      meaning: "Impressive or magnificent in appearance or style.",
    },
    {
      word: "Heterogeneous",
      tone: "Neutral",
      meaning: "Diverse in character or content.",
    },
    {
      word: "Iconoclastic",
      tone: "Neutral",
      meaning: "Characterized by attack on cherished beliefs or institutions.",
    },
    {
      word: "Juvenile",
      tone: "Neutral",
      meaning: "Of, for, or relating to young people.",
    },
    {
      word: "Kinesthetic",
      tone: "Neutral",
      meaning:
        "Relating to a person's ability to move and to the sense of body movement.",
    },
    {
      word: "Liminal",
      tone: "Neutral",
      meaning: "Relating to a transitional or initial stage of a process.",
    },
    {
      word: "Mediocre",
      tone: "Neutral",
      meaning: "Of only moderate quality; not very good.",
    },
    {
      word: "Noteworthy",
      tone: "Neutral",
      meaning: "Deserving attention; remarkable.",
    },
    {
      word: "Obfuscate",
      tone: "Neutral",
      meaning: "To confuse or make unclear.",
    },
    {
      word: "Plausible",
      tone: "Neutral",
      meaning: "Seeming reasonable or probable.",
    },
    {
      word: "Quasar",
      tone: "Neutral",
      meaning: "An extremely luminous active galactic nucleus.",
    },
    {
      word: "Rudimentary",
      tone: "Neutral",
      meaning: "Involving or limited to basic principles.",
    },
    {
      word: "Seminal",
      tone: "Neutral",
      meaning: "Strongly influencing later developments.",
    },
    {
      word: "Trepidation",
      tone: "Neutral",
      meaning:
        "A feeling of fear or agitation about something that may happen.",
    },
    {
      word: "Unconventional",
      tone: "Neutral",
      meaning:
        "Not based on or conforming to what is generally done or believed.",
    },
    {
      word: "Voracious",
      tone: "Neutral",
      meaning: "Having a very eager approach to an activity.",
    },
    {
      word: "Wistful",
      tone: "Neutral",
      meaning: "Having or showing a feeling of vague or regretful longing.",
    },
    {
      word: "Zenith",
      tone: "Neutral",
      meaning: "The time at which something is most powerful or successful.",
    },
  ];

  useEffect(() => {
    generateQuestion();
  }, []);

  // Timer logic
  useEffect(() => {
    if (timer > 0 && isActive) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleTimeUp(); // Handle time-up event
    }
  }, [timer, isActive]);

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * quizData.length);
    const randomQuestion = quizData[randomIndex];

    setQuestion(
      `What is the tone of the word: "${randomQuestion.word}"\n: ${randomQuestion.meaning}`
    );
    setCorrectAnswer(randomQuestion.tone);
    setWordMeaning(randomQuestion.meaning);
    setUserAnswer("");
    setMessage("");
    setTimer(10); // Reset the timer for each question
    setIsActive(true); // Reactivate the timer
  };

  const handleTimeUp = () => {
    setMessage(`Time's up! The correct answer was: ${correctAnswer}.`);
    setIsActive(false);

    setTimeout(() => {
      generateQuestion();
      onComplete(); // Move to the next quiz
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userAnswer === "") {
      setMessage("Please select your answer!");
      return;
    }

    // Check if the user's answer is correct
    if (userAnswer === correctAnswer) {
      setMessage("Correct!");
    } else {
      setMessage(`Wrong! The correct answer was: ${correctAnswer}.`);
    }

    setIsActive(false); // Stop the timer on submission
    setTimeout(() => {
      generateQuestion();
      onComplete(); // Move to the next quiz
    }, 3000);
  };

  return (
    <Box
      p={4}
      //   maxW="500px"
      //   mx="auto"
      //   borderWidth="1px"
      //   borderRadius="lg"
      //   boxShadow="lg"
    >
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
        {question}
      </Text>

      <Progress
        value={(timer / 10) * 100}
        size="sm"
        colorScheme="teal"
        mb={4}
      />

      <form onSubmit={handleSubmit}>
        <RadioGroup onChange={setUserAnswer} value={userAnswer}>
          <Stack direction="column">
            <Radio value="Positive">Positive</Radio>
            <Radio value="Negative">Negative</Radio>
            <Radio value="Neutral">Neutral</Radio>
          </Stack>
        </RadioGroup>

        <Button type="submit" colorScheme="teal" size="lg" width="full" mt={4}>
          Submit
        </Button>
      </form>

      {message && (
        <Text
          mt={4}
          fontSize="xl"
          textAlign="center"
          color={message.includes("Correct") ? "green.500" : "red.500"}
        >
          {message}
        </Text>
      )}

      {/* {message && (
        <Text mt={2} fontSize="lg" textAlign="center" color="gray.500">
          Meaning: {wordMeaning}
        </Text>
      )} */}
    </Box>
  );
};

export default ToneQuiz;
