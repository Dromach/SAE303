<?php

// Fonction pour lire les données à partir d'un fichier JSON
function TrouveData($valeur, $clé , $nomfichier ) {
   
    if (file_exists($nomfichier)) {
        $json_data = file_get_contents($nomfichier);
        $data = json_decode('[' . $json_data . ']', true);

        // Filtrer les données en fonction de la clé et de la valeur
        $donnéesfiltré = array_filter($data, function ($item) use ($clé, $valeur) {
            return isset($item[$clé]) && $item[$clé] == $valeur;
        });

        return $donnéesfiltré;
    } else {
        return null;
    }
}


if ($response !== null) {
    echo json_encode($response);
} else {
    echo json_encode(array('error' => 'Fichier de données non trouvé pour le filtre spécifié.'));
}

?>

<?php


// Fonction pour lire les données à partir d'un fichier JSON et filtrer par clé et valeur
function TrouveData($fichiers, $cle, $valeur)
{
    $donneesfiltre = array();

    foreach ($fichiers as $nomfichier) {
        if (file_exists($nomfichier)) {
            $json_data = file_get_contents($nomfichier);
            $data = json_decode('[' . $json_data . ']', true);

            // Filtrer les données en fonction de la clé et de la valeur
            $resultats = array_filter($data, function ($item) use ($cle, $valeur) {
                return isset($item[$cle]) && $item[$cle] == $valeur;
            });

            // Ajouter les résultats au tableau des données filtrées
            $donneesfiltre[$nomfichier] = $resultats;
        } else {
            $donneesfiltre[$nomfichier] = null;
        }
    }

    return $donneesfiltre;
}

// Récupérer les valeurs du formulaire
$fichiersAComparer = isset($_POST['fichiers']) ? $_POST['fichiers'] : array();
$cleFilter = isset($_POST['cle']) ? $_POST['cle'] : null;
$valeurFilter = isset($_POST['valeur']) ? $_POST['valeur'] : null;

// Obtenir les données filtrées
$donneesFiltrees = TrouveData($fichiersAComparer, $cleFilter, $valeurFilter);

// Renvoyer les données au format JSON
echo json_encode($donneesFiltrees);
?>



<form action="filtre.php" method="post">
    <label for="fichiers">Sélectionnez les fichiers à comparer :</label>
    <select name="fichiers[]" id="fichiers" multiple>
        <option value="naissances-2004-60.json">Oise</option>
        <option value="naissance-2004-75.json">Paris</option>
        <option value="naissance-2004-77.json">Seine-et-Marne</option>
        <option value="naissance-2004-78.json">Yvelines</option>
        <option value="naissance-2004-91.json">Val-de-Marne</option> 
        <option value="naissance-2004-92.json">Haut-de-Seine</option>
        <option value="naissance-2004-93.json">Seine-Saint-Denis</option>
        <option value="naissance-2004-95.json">Val d'Oise</option>
        <!-- Ajoutez autant d'options que nécessaire pour vos fichiers -->
    </select>

    <label for="cle">Clé de filtrage :</label>
    <input type="text" name="cle" id="cle" required>

    <label for="valeur">Valeur de filtrage :</label>
    <input type="text" name="valeur" id="valeur" required>

    <button type="submit">Rechercher</button>
</form>