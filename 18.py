def erlang_b(A, C):
    B = 1.0
    for i in range(1, C + 1):
        B = (A * B) / (i + A * B)
    return B

traffic = float(input("Offered Traffic (Erlangs): "))
channels = int(input("Number of Channels: "))

blocking_prob = erlang_b(traffic, channels)

print("\nCall Blocking Probability =", blocking_prob)
print("Blocking Probability (%) =", blocking_prob * 100)