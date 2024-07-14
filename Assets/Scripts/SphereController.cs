using System.Collections;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

public class SphereController : MonoBehaviour
{
    public Volume postProcessVolume;
    private Bloom bloomLayer;
    private float currentRadiationLevel;
    private string url = "http://192.168.0.60:5000/getCubeData";

    void Start()
    {
        if (postProcessVolume.profile.TryGet<Bloom>(out bloomLayer))
        {
            Debug.Log("Bloom layer found");
        }
        else
        {
            Debug.LogError("Bloom layer not found");
        }
        StartCoroutine(PollData());
    }

    IEnumerator PollData()
    {
        while (true)
        {
            Debug.Log("Sending request to server...");

            UnityWebRequest request = UnityWebRequest.Get(url);
            yield return request.SendWebRequest();

            if (request.result == UnityWebRequest.Result.ConnectionError || request.result == UnityWebRequest.Result.ProtocolError)
            {
                Debug.LogError("Error: " + request.error);
            }
            else
            {
                Debug.Log("Response: " + request.downloadHandler.text);
                ProcessResponse(request.downloadHandler.text);
            }

            // 1√  ¥Î±‚
            yield return new WaitForSeconds(1f);
        }
    }

    void ProcessResponse(string jsonResponse)
    {
        SphereData data = JsonUtility.FromJson<SphereData>(jsonResponse);
        currentRadiationLevel = data.brightness;

        if (bloomLayer != null)
        {
            bloomLayer.intensity.value = currentRadiationLevel;
            Debug.Log("Bloom intensity updated to: " + currentRadiationLevel);
        }
    }

    [System.Serializable]
    private class SphereData
    {
        public float brightness;
    }
}
