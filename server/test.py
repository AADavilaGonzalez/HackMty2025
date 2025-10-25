import json
from optimization import optimize_debt # Importa tu función
import cProfile # Para medir rendimiento (opcional)
import pstats   # Para medir rendimiento (opcional)

# --- ESTE ES EL DICCIONARIO (JSON) CON LOS DATOS DE PRUEBA ---
sample_data_dict = {
    "user": {
        "balance": 1500.0,
        "averageIncome": 3000.0  # Presupuesto mensual
    },
    "debts": [
        {
            "name": "Tarjeta de Crédito Rápida",
            "balance": 2500.0,
            "interestRate": 0.22,  # 22% Tasa Anual
            "minimumPayment": 100.0
        },
        {
            "name": "Préstamo Estudiantil",
            "balance": 15000.0,
            "interestRate": 0.06,  # 6% Tasa Anual
            "minimumPayment": 200.0
        },
        {
            "name": "Crédito de Auto",
            "balance": 8000.0,
            "interestRate": 0.09,  # 9% Tasa Anual
            "minimumPayment": 250.0
        }
    ]
}
# -----------------------------------------------------------


# --- Ejecutamos la prueba ---
if __name__ == "__main__":
    print("--- [INICIO] Ejecutando prueba de optimización ---")
    
    # --- Profiling (Opcional) ---
    # Esto te dirá cuánto tarda cada parte de tu función
    profiler = cProfile.Profile()
    profiler.enable()

    # --- Llamamos a la función directamente ---
    payment_plan_results = optimize_debt(sample_data_dict)
    
    profiler.disable()
    # --- Fin Profiling ---

    print("\n\n--- [FIN] Resultados (JSON) que la API devolvería ---")
    # Imprimimos el diccionario que la función devolvió
    print(json.dumps(payment_plan_results, indent=2))
    
    print("\n--- [INFO] Tiempos de Ejecución (Profiling) ---")
    stats = pstats.Stats(profiler).sort_stats('cumulative')
    stats.print_stats(10) # Imprime las 10 funciones más lentas
