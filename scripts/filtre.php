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