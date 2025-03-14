#!/bin/bash

echo "🔧 Modificando Podfile para agregar :modular_headers => true a Firebase pods"

PODFILE_PATH="ios/Podfile"

# Agregar modular_headers por pod de forma segura
sed -i.bak -e "s/pod 'FirebaseAuth'/pod 'FirebaseAuth', :modular_headers => true/" "$PODFILE_PATH"
sed -i.bak -e "s/pod 'FirebaseCore'/pod 'FirebaseCore', :modular_headers => true/" "$PODFILE_PATH"
sed -i.bak -e "s/pod 'FirebaseCoreInternal'/pod 'FirebaseCoreInternal', :modular_headers => true/" "$PODFILE_PATH"
sed -i.bak -e "s/pod 'FirebaseFirestore'/pod 'FirebaseFirestore', :modular_headers => true/" "$PODFILE_PATH"
sed -i.bak -e "s/pod 'GoogleUtilities'/pod 'GoogleUtilities', :modular_headers => true/" "$PODFILE_PATH"

echo "✅ Podfile modificado correctamente"
